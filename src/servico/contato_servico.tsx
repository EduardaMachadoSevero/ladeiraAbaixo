import { Contato } from '../modelo/Contato'
import {Conexao} from '../bancodedados/conexao'

const table = "contato"
const db=Conexao.getConnection()

export default class ContatoServico {
     static addData(param: Contato) {
        return new Promise((resolve, reject) =>db.transaction(
            tx => {
                tx.executeSql(`insert into ${table} (nome,email,nacionalidade,AtributoEduarda) 
                values (?,?,?,?)`, 
                [param.nome, param.email,param.nacionalidade,param.AtributoEduarda], 
                (_, { insertId, rows }) => {
                    console.log("id insert: " + insertId);
                    resolve(insertId)
                }), (sqlError) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
            }));
    }

     static deleteById(id: number) {
        db.transaction(
            tx => {
                tx.executeSql(`delete from ${table} where id = ?;`, [id], (_, { rows }) => {
                }), (sqlError) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
    
            });
    }


     static updateByObjeto(param: Contato) {
        return new Promise((resolve, reject) =>db.transaction(tx => {
                tx.executeSql(`update ${table} set nome = ? , email = ?, nacionalidade = ?, AtributoEduarda = ? where id = ?;`, [param.nome,param.email,param.nacionalidade,param.AtributoEduarda,param.id], () => {
                }), (sqlError) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
    
            }));
    }

     static findById(id: number) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table} where id=?`, [id], (_, { rows }) => {
                resolve(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);

        }));
    }

    // static findByNome(nome: string) {
    //     return new Promise((resolve, reject) => db.transaction(tx => {
    //         tx.executeSql(`select * from ${table} where nome=?`, [nome], (_, { rows }) => {
    //             resolve(rows)
    //         }), (sqlError) => {
    //             console.log(sqlError);
    //         }}, (txError) => {
    //         console.log(txError);

    //     }));
    // }

      static findAll() {        
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table}`, [], (_, { rows }) => {
                resolve(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);
        }))


    }


}
