//Author : Hardik Pratap Singh

//AIM : I am trying to get the data of countries and their capitals from wikipedia and storing it in the 
//JSON format in a file named hardik_p_singh.json

//However, the output is not looking that good, but yeah all countries and their capitals are successfully matched... 


const axios = require("axios");
const cheerio = require("cheerio"); 
const fs = require("fs");


const url = "https://indianexpress.com/section/india/" ; 

async function scrape(){
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const news = $(".articles h2 a") ; 
    // const capitalname = $("table tr td:nth-child(2)") ; 
    let obj = {
        book : "", 
        author : "", 
    };

    let s = "" ; 

    const matrix = [] ; 
    news.each(function (idx,el) {
        // const coun = $(el).find("td:nth-child(1)").text().trim() ; 
        // const capi = $(el).find("td:nth-child(2)").text().trim() ; 
        // const capi = $(el).find("nth-child(2)").text() ; 
        const d = $(el).text().trim() ; 

        // obj.country = coun ;  
        // obj.capital = capi ;  
        s =  d; 
        // console.log(d) ; 
        matrix.push(s) ; 
    }); 

    fs.writeFile("hardik1234.json", JSON.stringify(matrix,null, 2), (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Successfully written data to file");
      });
}

scrape();