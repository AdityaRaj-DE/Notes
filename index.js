const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")));

app.get('/',function(req, res){
    fs.readdir(`./files`,function(err,files){
        res.render("index.ejs", {files: files});
    })
})
app.post('/delete',function(req,res){
    fs.unlink(`./files/${req.body.title}.txt`,function(err){
        if(err) {
            console.log(err);
            return res.status(500).send("Error deleting file");
        }
        res.redirect("/");
    })
})
app.get('/file/:filename',function(req, res){
    fs.readFile(`./files/${req.params.filename}`, "utf-8",function(err, filedata){
        res.render('show',{filename: req.params.filename,filedata: filedata});
    })
})
app.post('/create',function(req, res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
        res.redirect("/");
    })
})

app.listen(3000);