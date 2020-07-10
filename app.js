const express = require("express");
const app = express();
require("./src/puppeteer")
app.get("/" , (req,res)=>{
    res.send("Hi")
});
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Listening on Port${PORT}`);
});

 function testFunction(){
     
 }
