'use strict';
var constants = require('./constants.config');

module.exports = {
    response_code: {
        "201_success" : {
            "header_code" : 201,
            "code" : 201,
            "status" : "ok",
            "message": "create success"
        },"200_success" : {
            "header_code" : 200,
            "code" : 200,
            "status" : "ok",
            "message": "success"
        },"400_error" : {
            "header_code" : 400,
            "code" : 400.03,
            "status" : "failed",
            "message" : "System Error.",
        },"400_error_token" : {
            "header_code" : 400,
            "code" : 400.02,
            "status" : "failed",
            "message" : "Token Fail.",
        },"400_error_require" : {
            "header_code" : 400,
            "code" : 400.01,
            "status" : "failed",
            "message" : "Missing Require field.",
        },"400_status_not_allow" : {
            "header_code" : 400,
            "code" : 400.05,
            "status" : "failed",
            "message" : "Action Not Allow.",
        },"400_server_error" : {
            "header_code" : 400,
            "code" : 400,
            "status" : "failed",
            "message" : "Can't Connect Server",
        },"400_duplicate_data" : {
            "header_code" : 400,
            "code" : 400,
            "status" : "failed",
            "message" : "Duplicate Data",
        },"404_data_not_found" : {
            "header_code" : 404,
            "code" : 404,
            "status" : "failed",
            "message" : "Data Not Found.",
        },"500_Internal_Error" : {
            "header_code" : 500,
            "code" : 500,
            "status" : "failed",
            "message" : "Internal Error.",
        }
    }
}