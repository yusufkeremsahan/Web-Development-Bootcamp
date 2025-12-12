import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Hello Kerem!</h1> ");
    //console.log(req.rawHeaders);
})
app.get("/contact", (req, res) => {
    res.send("<h1>Contact Me!</h1>")
})
app.get("/about", (req, res) => {
    res.send("<h1>About!</h1>")
})

app.listen(port, () =>{
    console.log(`The app is running on ${port}!`);
})


