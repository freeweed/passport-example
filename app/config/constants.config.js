'use strict';

const DMPENV = process.env.DMPENV;

let db = {};
let test = false;
let secretKey = "g33k$terd!g!tals0lut!0n"
if(DMPENV == 'local'){
    db = {
        name: "geek_user",
        collections: ["user"]
    };
} else if(DMPENV == 'dev'){
    db = {
        name: "geek_user",
        collections: ["user"]
    };
}else{
    db = {
        name: "geek_user",
        collections: ["user"]
    };
}
module.exports = {
    db,
    test,
    secretKey
}