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


let visited = [];

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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
