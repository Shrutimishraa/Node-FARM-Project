const http = require('http');
const fs = require('fs');
const url = require('url');
const { json } = require('stream/consumers');
const dataJSON = require('../dev-data/data.json');
//server

const replaceTemplate = (temp , product)=>{ 
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName)
    output = output.replace(/{%IMAGE%}/g,product.image)
    output = output.replace(/{%PRICE%}/g,product.price)
    output = output.replace(/{%FROM%}/g,product.from)
    output = output.replace(/{%NUTRIENTS%}/g,product.nutrients)
    output = output.replace(/{%QUANTITY%}/g,product.quantity)
    output = output.replace(/{%DESCRIPTION%}/g,product.description)
    output = output.replace(/{%ID%}/g,product.id);
    if(!product.organuc)
    output=output.replace(/{%NOT-ORGANIC%}/g,'non-organic');
return output;
}

const tempOverview = fs.readFileSync(`../templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`../templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`../templates/template-product.html`,'utf-8');


const data = fs.readFileSync(`../dev-data/data.json`,'utf-8');
    const dataObj = JSON.parse(data)


const Server = http.createServer((req,res)=>{
    //console.log(req.url);
    //console.log(url.parse(req.url,true));
    const {query , pathname} = url.parse(req.url,true);
    
    //const pathName = req.url;

    //overview page
    if (pathname === '/' || pathname === '/overview'){
        //res.end('This is the overview');
        res.writeHead(200,{'content-type':'text/html'});
        const cardsHTML = dataObj.map(el=>replaceTemplate(tempCard , el)).join('');
        //console.log(cardsHTML);
        const output = tempOverview.replace('{%PRODUCT_CARDS%',cardsHTML);
        res.end(output);
        
    //Product page
    } else if (pathname === '/product'){
        res.writeHead(200,{'content-type':'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct,product);
        res.end(output);
        //res.end('This is the product');
    }
    //api
    else if (pathname === '/api'){             
        console.log(`../dev-data/data.json`);
        //fs.readFile(`../dev-data/data.json`,'utf-8',(err,data)=>{
          // const ProductData = JSON.parse(data)
           //console.log(ProductData);
            //console.log(typeof(result), typeof(dataJSON));
            //res.writeHead(200,{'content-type':'application/json'});
            //res.end(data);
       // })
        //res.end('Api');
        res.writeHead(200,{'content-type':'application/json'});
        res.end(data);
    }
    //page not found
    else {
        res.writeHead(404,{
            'content-type': 'text/html',
            'my-own-header':'hello-world'
        });
        res.end ('<h1>Page not found !</h1>');
    }
    //Write req in file Request.txt
    //res.end("Hello from server !!")
});
Server.listen(8000,'127.0.0.1',()=>{
    console.log('Listening to request on Port:8000');
});
