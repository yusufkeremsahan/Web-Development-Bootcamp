// @ts-check

import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let db = new pg.Client({
  user: "postgres",
  database: "world",
  password: "Eses2626.",
  port: 5432,
  host: "localhost"
});

db.connect();

app.get("/", async (req, res) => {
  
  let result = await db.query("SELECT code FROM visited_countries");
  // @ts-ignore
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.code);
  });
  // @ts-ignore
  console.log(countries);

  res.render("index.ejs", {
    // @ts-ignore
    countries: countries,
    total: countries.length
  });
});

app.post("/add", async(req, res) =>{
  const country = req.body["country"];
  const result = await db.query("SELECT country_code FROM countries WHERE country_name = $1",[country]);
  
  let code;
  if(result.rows.length !== 0){
    code = result.rows[0].country_code;
    await db.query("INSERT INTO visited_countries (code) VALUES ($1)", [code]);
  }
  res.redirect("/");
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
