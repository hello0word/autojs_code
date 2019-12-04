const https = require("https")
const fs = require("fs")

var info=[["main.js","e6bfqhxcmu1np47jzt9oa20"]]
var base = "https://gitee.com/api/v5/gists/"
// https.request()


info.forEach((element) => {
    var  url=base+element[1]+"?access_token=e7c2845a0fbebd2be9fc7ee82a39392f"
    console.log(url)
    var con = fs.readFileSync(element[0],encoding="utf-8")
    console.log(con)
    let file = {}
    file[element[0]]={content:con}
    let json = {files:file}
    json= JSON.stringify(json)
    var options = { contentType: "application/json", method: "PATCH", body: json };
    var req= https.request(url,options,(res) => {
        console.log('状态码:', res.statusCode);
        console.log('请求头:', res.headers);
      
        res.on('data', (d) => {
          process.stdout.write(d);
        });
      });
    req.on('error', (e) => {
    console.error(e);
    });
    req.end();
});