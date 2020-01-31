'use strict';

const request = require('request'),
      requestConfig = require('../config/request.config'),
      paramConfig = require('../config/parameter.config'),
      constants = require('../config/constants.config');

class doHttp{

    constructor(headers = null){
        if(headers){
            this.Headers = headers;
        }else{
            this.Headers = requestConfig.headers;
        }
    }

    getHeader(header){
        return this.Headers;
    }

    setHeader(header){
        this.Headers = header;
    }

    getInput(req){
        if(Object.keys(req.query).length){
            return req.query;
        }else if(Object.keys(req.params).length){
            return req.params
        }else if(Object.keys(req.body).length){
            return req.body
        }else{
            return null;
        }
    }

    sendRequest(method, link, data){
        return new Promise((resolve, reject) => {
            let opt = {
                url: link,
                method: method,
                qs: data,
                form: data,
                headers: this.Headers
            }
    
            request(opt, (err, response, body) => {
                try{
                    if(err) throw err
                    else resolve({response, body, err})
                }catch(e){
                    reject(e)
                }
            });
        })
    }

    sendResponse(res = null, code = null, data = null){
        if(!res || !code)
            throw "invalid param";
        let resData = requestConfig.response_code[code];
        if(resData){
            if(data){
                if(data.error){
                    resData.error = data.error;
                }else{
                    resData.data = data;
                }
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(resData.code).json(resData);
        }else{
            throw "invalid code";
        }
    }

}

module.exports = doHttp;
