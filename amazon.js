const axios = require("axios");
const cheerio = require("cheerio"); 
const fs = require("fs"); 

const writeStream = fs.createWriteStream("post5.csv")  ; 

// Write Headers 

writeStream.write(`Name , Price\n`)  ; 

const url = "https://www.amazon.in/s?k=mobile+phones&crid=2O0WXL15A9U37&sprefix=mobile+phones%2Caps%2C347&ref=nb_sb_noss_1";
// const url = "https://www.amazon.in/s?k=books&ref=nb_sb_noss";
// const url = "https://www.amazon.in/s?k=electronics&crid=3OLVV26MC9DTE&sprefix=electroni%2Caps%2C333&ref=nb_sb_noss_2";

async function scrape(){
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const d1 = $(".a-section.a-spacing-small.a-spacing-top-small") ;
    let matrix =  [] ;  
    d1.each(function (idx, el) {

        const Name = $(el).find(".a-size-medium.a-color-base.a-text-normal").text().replace(/,/ , "");
        // const a = $(el).find("h2 a span").text();

        const b = $(el).find(".a-price .a-offscreen").text().replace(/,/ , "");
        // console.log("Name : "  + a + "Price : " + b ) ;  
        const c = b.split("₹");
        const Price = "₹" + c[1] ; 
        // const d1 = 2 ; 
        // const GetItBy = $(el).find(".a-row.s-align-children-center") ; 
        // const d = $(el).find(".a-row.s-align-children-center") ; 
        // const e = d.find("span:nth-child(2)").text() ; 
        // const e = d.find("span:nth-child(1)").text() ; 
        // console.log("Name " + Name + "Price : ₹" + Price);
        // console.log("Get It by " + e); 

        // let obj = { 
        //     Name : Name , 
        //     Price : Price , 
        //     GetItBy : GetItBy 
        // }; 
        matrix.push({
            Name , 
            Price  
        }) ; 

        // writeStream.write(`${Name} ${Price} \n`) ;

    }); 

    // console.log('Scraping Done....')

    fs.writeFile("hardik.json", JSON.stringify(matrix , null ,2  ), (err) => { 
    if (err) {
        console.error(err);
        return;
    }
    console.log("Successfully written data to file"); 
    });
}

scrape();