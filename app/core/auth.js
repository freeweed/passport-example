const ExtractJwt = require("passport-jwt").ExtractJwt,
      JwtStrategy = require("passport-jwt").Strategy,
      FacebookStrategy = require('passport-facebook').Strategy
      validate = require("simple-json-validate"),

      paramConfig = require("../config/parameter.config"),
      secretKey = require("../config/constants.config").secretKey,
      doHttp = require('../core/doHttp'),
      Database = require("../core/db"),

      collection = "user",
      validated = new validate(paramConfig),
      http = new doHttp(),
      DB = new Database(collection)

loginMiddleWare = function() {
    return function(req, res, next){
        try{
            let input = http.getInput(req)
            let validData = validated.check("login", input)
            if(validData.error){
                throw {
                    code: "400_error_require",
                    data: validData
                }
            }else{
                DB.getOne(collection, {"username": validData.username}).then((user) => {
                    if(user == null){
                        http.sendResponse(res,"404_data_not_found", {
                            "message": "Invalid User or Password"
                        });
                    }else{
                        if(user.username == validData.username && user.password == validData.password){
                            next()
                        }else{
                            http.sendResponse(res, "404_data_not_found", {
                                "message": "Invalid User or Password"
                            });
                        }
                    }
                })
            }
        }catch(e){
            http.sendResponse(res, "500_Internal_Error", e);
        }
    }
}

module.exports = {
    loginMiddleWare,
    jwtAuth: new JwtStrategy({
        // jwtFromRequest: ExtractJwt.fromHeader("Authorization"),
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
        secretOrKey: secretKey
    }, async (payload, done) => {
        try{
            let user = await DB.getOne(collection, {"username": payload.sub})
            if(user == null){
                done(null, false)
            }else{
                done(null, true)
            }
        }catch(e){
            done(e, false);
        }
    }),
    facebookAuth: new FacebookStrategy({
        clientID: "xxxxxxxxxxx", // from your facebook
        clientSecret: "xxxxxxxxxxxxxxxx", // from your facebook
        callbackURL: "http://localhost:3000/auth/facebook/callback"
      },
      async function(accessToken, refreshToken, profile, cb) {
        try{
            let user = await DB.getOne(collection, {"facebookId": profile.id})
            if(user == null){
                profile.accessToken = accessToken
                profile.refreshToken = refreshToken
                await DB.insert(collection, profile)
                cb(null, profile)
            }else{
                cb(null, user)
            }
        }catch(e){
            done(e, false);
        }
        // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
      }
    )
    
}

