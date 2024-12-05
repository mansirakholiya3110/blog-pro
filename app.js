const express = require("express")
const app = express()
require('dotenv').config();
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const routerr = require("./router/adminrouter")
const Blog = require("./model/blogmodel")

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/user", routerr)

const port = process.env.PORT;
const dbURL = process.env.MONGO_URL;

app.get("/", async (req, res) => {
    try {
        const student = await Blog.find();
        console.log(student)
        res.render("blog", { record: student });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.post("/insertData", async (req, res) => {
    const { name, price, image } = req.body;
    try {
        const newBlog = await Blog.insertMany({ name, price, image });
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// delet
app.get("/deleteData", async (req, res) => {
    const userid = req.query.userid;
    try {
        await Blog.findByIdAndDelete(userid); 
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

// edit
app.get("/editData", async (req, res) => {
    const userid = req.query.userid;
    console.log(userid)
    try {
        const blog = await Blog.findById(userid);
        res.render("edit", { record: blog });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.post("/editData", async (req, res) => {
    const { name, price, image } = req.body;
    try {
        await Blog.findOneAndUpdate({ name, price, image })

        res.redirect("/",);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    mongoose.connect(dbURL)
        .then(() => console.log(`DB connecter...!!`))
        .catch((err) => console.log(err));
    console.log(`server start..http://localhost:${port}`);
})
// http://localhost:9000/user
// http://localhost:9000/user/signinform
// http://localhost:9000/user/loginform