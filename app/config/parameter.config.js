'use strict';

module.exports = {
    "register": {
        "username": "required",
        "password": "required|min_length[8]",
        "firstname": "required",
        "lastname": "required"
    },
    "login": {
        "username": "required",
        "password": "required"
    }
}