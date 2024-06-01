const fs = require('fs');
//Blocking , Synchronous way
//Reading file 
const textIN = fs.readFileSync('./txt/input.txt','utf-8');
console.log(textIN);
const textOUT = `This is what we know about the avocado:${textIN}.\nCreated On ${Date.now()}`;
console.log(textOUT);
//Writing file in Output.txt 
fs.writeFileSync('./txt/output.txt',textOUT);
console.log("File written !!")

//Non Blocking ,Asynchronous way
fs.readFile('./txt/start.txt','utf-8',(err, data1)=>{
    console.log(`./txt/${data1}.txt`);
    fs.readFile(`./txt/${data1}.txt`,'utf-8',(err, data2)=>{
        //console.log(err)
        console.log(data2);
        //console.log(`./txt/${data1}`);
        console.log(`./txt/${data1}.txt`);
        fs.readFile('./txt/append.txt','utf-8',(err,data3)=>{
            console.log({data3});
            fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8',(err)=>{
                console.log("You will get new file final.txt now");
            })
        })
    })
})
console.log("Hello ! what do you think i'll come first?");
console.log('This gives current directory :',`${__dirname}`);
