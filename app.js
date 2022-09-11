const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/Problems.html");
});

app.post("/", function(req, res){
    const tag = req.body.tagName;
    const url = "https://codeforces.com/api/problemset.recentStatus?count=10";
    https.get(url, function(response){
        response.on("data", function(data){
            const problemsetData = JSON.parse(data);
            for (let i = 0; i < 10; i++) {
                const problemTag = problemsetData.result[i].problem.tags;
                const problemName = problemsetData.result[i].problem.name;
                if(problemTag.includes(tag)){
                    // console.log(problemName);
                    var table = document.querySelector(".problem-table");
                    var row = table.insertRow(i);
                    var c1, c2, c3;
                    c1 = row.insertCell(0);
                    c1 = row.insertCell(1);
                    c1 = row.insertCell(2);
                    c1.innerHTML = problemName;
                    c2.innerHTML = "Codeforces";
                    c3.innerHTML = tag;
                } 
            }
        });
    });
})

app.listen("3000", function(){
    console.log("Server started on port 3000");
});


