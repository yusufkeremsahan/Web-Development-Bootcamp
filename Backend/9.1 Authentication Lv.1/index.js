import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  password: "Sifre.",
  host: "localhost",
  port: 5432,
  database: "secrets"
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  
  try{
    const result = await db.query("INSERT INTO users (mail,password) VALUES($1, $2) RETURNING *; ",[email, password]);
    console.log(result);
    res.render("secrets.ejs");
  }catch(err){
    console.log(err);
    res.redirect("/register");
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try{
    const result = await db.query("SELECT password FROM users WHERE mail = $1 ",[email]);
    if(result.rowCount > 0){
      if(password === result.rows[0].password){
        res.render("secrets.ejs");
      }else{
        res.send("Invalid password!");
      }
    }else{
      res.render("Invalid mail!");
    }
  }catch(err){
    console.log(err);
    res.redirect("/login");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
