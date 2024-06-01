const http = require('http');
const fs = require('fs')
const Server = http.createServer((req,res)=>{
    //const result =stringify (json.req)
    //fs.writefile('./Webserver/Request.txt',result,'utf-8',(err) => {
    
    res.end("Hello from server !!")
})
Server.listen(8000,'127.0.0.1',()=>{
    console.log('Listening to request on Port:8000')
})
