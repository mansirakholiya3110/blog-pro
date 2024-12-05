const sModel=require("../model/signinmodel")
const blogModel=require("../model/blogmodel")

const signedin = (req, res) => {
    console.log('Sign-in form submitted', req.body);

    let fname = req.body.Firstname;
    let lname = req.body.Lastname;
    let email = req.body.Email;
    let pword = req.body.Password;
    let cpword = req.body.ConfirmPassword;

    if (!fname || !lname || !email || !pword || !cpword) {
        console.log("Missing required fields");
        return res.status(400).send("All fields are required.");
    }

    if (pword !== cpword) {
        console.log("Passwords do not match");
        return res.status(400).send("Passwords do not match.");
    }

    sModel.create({
        Firstname: fname,
        Lastname: lname,
        Email: email,
        Password: pword,
        ConfirmPassword: cpword
    })
    .then((data) => {
        // console.log("User successfully signed in", data);
        // res.cookie("id",data.id).send(data)
        res.redirect("/user/loginform")
    })
    .catch((err) => {
        console.log("Error during sign-in:", err);
        res.status(500).send("An error occurred during sign-in.");
    });
};

const header=(req,res)=>{
    res.render("header")
}

const signinForm=(req,res)=> {
    res.render("signinForm")
}

const loginForm=(req,res)=>{
    res.render("loginForm")
}

const logedin=async(req,res)=>{
         
        let email=req.body.Email
        let pword=req.body.Password

        const isUser = await sModel.findOne({Email:email,Password:pword})
        if (!isUser) {
          return res.status(404).send({message:"User not Found"})
        }
        res.render("blog")
      }


      const blog = (req, res) => {
        blogModel.find()
            .then((data) => {
                console.log(data);
                res.render("blog", { record: data }); // Pass the data as 'record'
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send("Error retrieving blogs");
            });
    };

const blogdetail=(req,res)=>{
    let title=req.body.Title
    let img=req.body.Image
    let p=req.body.P

    blogModel.create({
        Title:title,
        Image:img,
        P:p
    })
    .then((data) => {
        console.log("data successfully inserted",data);
        return res.send(data)
    })
    .catch((err)=>{
        console.log(err);
    })
}

const deleteblog=(req,res) => {
    let id=req.query.id

    blogModel.findByIdAndDelete(id)
    .then((data) => {
        console.log("data successfully deleted");
        return res.redirect("/");
    }).catch((err) => {
        console.log(err);
    })
}

const updateblog = (req,res) => {
    let id=req.body.id
    let title=req.body.Title
    let img=req.body.Image
    let p=req.body.P

    blogModel.findByIdAndUpdate(id,{Image:img,Title:title,P:p})
    .then((data) => {
        console.log("data successfully updated",data);
    })
    .catch((err) => {
        console.log(err);
    })
    return res.redirect("/")
}


module.exports={signedin,header,signinForm,loginForm,logedin,blog,blogdetail,deleteblog,updateblog}