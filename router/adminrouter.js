const express=require("express")
const routerr=express.Router()
const {signedin,header,signinForm,loginForm,logedin,blog,blogdetail,deleteblog} = require("../controller/admincontroller")
const {Auth} = require("../middleware/Auth")

routerr.get("/",header)
routerr.get("/signinform",signinForm)
routerr.get("/loginform", loginForm)
routerr.post("/signedin",signedin)
routerr.post("/logedin", logedin)
routerr.get("/blog",Auth,blog)
routerr.post("/blogdetail",blogdetail)
routerr.delete("/deleteblog",deleteblog)

module.exports=routerr