let express=require("express");
const { copyFileSync } = require("fs");
let mysql=require("mysql2");
let con = mysql.createConnection({ host: "localhost",user: "root",password: "Arduino1",database:"cinepeedika",});
let path=require("path");
const app=express();
app.use(express.text());
app.use(express.json());
app.use(express.static('public'));
app.get("/",(req,res) =>{
    res.sendFile(path.join(__dirname,"public",'animatedlp.html'));
});
app.listen(8080,() =>{
    console.log("Server Starting Hi ;)");
});
let c;
app.post("/api/booked",(req,res)=>{
    let index=parseInt(req.body);
    c=index;
    con.query(`select seats from movies where no=${index}`,(err,row)=>{
        if (err) throw err;
        let s=row[0].seats;
        s=s.replace(/"/g,'');
        let booked=s.split(",");
        res.json(booked);
    });
});
app.post("/abooked",(req,res)=>{
    let booked=req.body;
    seat=booked.seats;
    con.connect(function(err) {
        if (err) throw err;
        var sqlQ = `Update movies set seats="${seat.toString()}" where no="${booked.no}";`;
        con.query(sqlQ, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
      });
});
app.get("/api/sidep",(req,res)=>{
    con.query("select mside from movies",(err,row)=>{
        if (err) throw err;
        let sidep= row.map(item => item.mside);
        res.json(sidep);
    });
})
app.get("/api/posters",(req,res)=>{
    con.query("select mpic from movies",(err,row)=>{
        if (err) throw err;
        let posters= row.map(item => item.mpic);
        res.json(posters);
    });
})
app.post("/api/moviedets",(req,res)=>{
    let c=req.body;
    c=parseInt(c);
    con.query(`select * from movies where no="${c+1}";`,function(err,result){
        if (err) throw err;
        let moviedets=Object.values(result[0]);
        res.json(moviedets);
    });
});
app.post("/api/searchbar",(req,res)=>{
    con.query(`select no from movies where mname="${req.body}";`,function(err,result){
        if (err) throw err;
        try{
            let movien=Object.values(result[0]);
            res.json(parseInt(movien));
        }
        catch{
            res.json("notfound");
        }
    });
});
app.get("/api/unames",(req,res)=>{
    console.log("s");
    con.query(`select username from users_list`,(err,row)=>{
        if (err) throw err;
        let unames= row.map(item => item.username);
        console.log(unames);
        res.json(unames);
    });
});
app.post("/api/adduser",(req,res)=>{
    var ob=req.body
    con.query(`insert into users_list values("${ob.usern}","${ob.firstn}","${ob.lastn}","${ob.pass}");`,function(err,result){
        if (err) throw err;
    });
});
app.post("/api/checkpass",(req,res)=>{
    var ob=req.body;
    con.query(`select password from users_list where username="${ob.usern}"`,function(err,result){
        if (err) throw err;
        res.json(result[0].password);
    });
});

app.post("/api/adminv",(req,res)=>{
    var ob=req.body;
    var picl=ob.im;
    var spicl=ob.side;
    var pic=picl.split("\\");
    var spic=spicl.split("\\");
    con.query(`update movies set mname="${ob.name}",mpic="${pic[pic.length-1]}",mside="${spic[spic.length-1]}",mdesc="${ob.desc}",seats="" where no="${ob.id}"`,function(err,result){
        if (err) throw err;
    });
});
app.post("/api/names",(req,res)=>{      
    var name=req.body;
    con.query(`select mname from movies where mname like "${name}%"`,(err,row)=>{
        if (err) throw err;
        var names=row.map(item=>item.mname);
        res.json(names);
    }); 
})