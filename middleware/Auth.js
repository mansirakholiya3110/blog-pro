const Auth=(req,res,next)=>{

    const {id}=req.cookies

    if(id){
        next()
    }else{
        res.redirect("/user/signinForm")
    }

}


module.exports={Auth}