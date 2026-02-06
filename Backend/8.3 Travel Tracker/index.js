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


async function get_countries(){
  // @ts-ignore
  let countries = [];
  const result = await db.query("SELECT code FROM visited_countries");
  
  result.rows.forEach((country) => {
    countries.push(country.code);
  });
  // @ts-ignore
  return countries;
}

app.get("/", async (req, res) => {
  const countries = await get_countries();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length
  });
});

app.post("/add", async(req, res) =>{
  const country = req.body["country"].toLowerCase();
  try{
    const result = await db.query("SELECT country_code FROM countries WHERE LOWER (country_name) LIKE '%' || $1|| '%' ",[country]);
    let code;
    if(result.rows.length !== 0){
      code = result.rows[0].country_code;
      try{
        await db.query("INSERT INTO visited_countries (code) VALUES ($1)", [code]);
        res.redirect("/");
      }catch(err){
        console.log(err);
        const countries = await get_countries();
        res.render("index.ejs", {
          countries: countries,
          total: countries.length,
          error: "Country has already been added, try again."
        });
      }
    }else{
      const countries = await get_countries();
      res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist, try again."
    });
    }
  }
  catch(err){
    console.log(err);
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
