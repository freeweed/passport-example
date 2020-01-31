const mongojs = require('mongojs'),
    contantsConfig = require('../config/constants.config').db;

class Database{

    async getOne(collection, exp){
        return new Promise(async (resolve, reject) => {
            try{
                this.db = mongojs(contantsConfig.name, contantsConfig.collections)
                console.log(JSON.stringify(exp))
                await this.db.collection(collection).findOne(exp, (err, result) => {
                    console.log(JSON.stringify(result))
                    resolve(result)
                })
            }catch(e){
                reject(e)
            }
        })
    }

    async get(collection, exp){
        return new Promise(async (resolve, reject) => {
            try{
                this.db = mongojs(contantsConfig.name, contantsConfig.collections)
                await this.db.collection(collection).find(exp, (err, result) => {
                    resolve(result)
                })
            }catch(e){
                reject(e)
            }
        })
    }

    insert(collection, data, exp){
        return new Promise(async (resolve, reject) => {
            try{
                this.db = mongojs(contantsConfig.name, contantsConfig.collections)
                await this.db.collection(collection).insert(data, (err, result) => {
                    resolve(result)
                })
            }catch(e){
                reject(e)
            }
        })
    }

    update(collection, data, exp){
        return new Promise(async (resolve, reject) => {
            try{
                this.db = mongojs(contantsConfig.name, contantsConfig.collections)
                await this.db.collection(collection).update(exp, data, (err, result) => {
                    resolve(result)
                })
            }catch(e){
                reject(e)
            }
        })
    }

    delete(collection, exp){
        return new Promise(async (resolve, reject) => {
            try{
                this.db = mongojs(contantsConfig.name, contantsConfig.collections)
                await this.db.collection(collection).remove(exp, (err, result) => {
                    resolve(result)
                })
            }catch(e){
                reject(e)
            }
        })
    }
}

module.exports = Database;