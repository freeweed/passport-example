const express = require("express"),
      validate = require("simple-json-validate"),
      jwt = require("jwt-simple"),
      passport = require("passport"),
    
      doHttp = require('../core/doHttp'),
      Auth = require('../core/auth'),
      Database = require("../core/db"),
      SECRET = require("../config/constants.config").secretKey,
      paramConfig = require("../config/parameter.config"),

      validated = new validate(paramConfig),
      http = new doHttp(),
      collection = "user",
      DB = new Database(collection),
      router = express.Router()

requireJWTAuth = passport.authenticate("jwt",{session:true});

router.post("/register", async (req, res) => {
    let input = http.getInput(req)
    let validData = validated.check("register", input)
    let code = "201_success";
    let output = {};
    try{
        if(validData.error){
            code = "400_error_require";
            output = validData
        }else{
            let user = await DB.getOne(collection, {"username": validData.username})
            if(user == null){
                let insertResult = await DB.insert(collection, validData)
                output = insertResult
            }else{
                code = "400_duplicate_data"
                output = {
                    message: `Error! usermame ${validData.username} already exist`
                }
            }  
        }
        http.sendResponse(res, code, output);
    } catch(e) {
        http.sendResponse(res, "500_Internal_Error");
    }
    
})
router.post("/auth", Auth.loginMiddleWare(), (req, res) => {
    const payload = {
       sub: req.body.username,
       iat: new Date().getTime()
    };
    res.send(jwt.encode(payload, SECRET));
})
router.get("/auth/facebook", passport.authenticate('facebook'))
router.get('/auth/facebook/callback',
    passport.authenticate('facebook',{ 
        successRedirect: '/profile',
        failureRedirect: '/' 
    })
)
router.get('/profile', (req, res) => {
  res.json(req.user)
})

router.get("/user", requireJWTAuth, (req, res) => {
    http.sendResponse(res, "200_success", "Hello World");
})
module.exports = router;