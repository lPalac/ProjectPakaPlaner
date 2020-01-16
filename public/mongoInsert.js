import express, { static } from "express"; 
import { json, urlencoded } from "body-parser"; 
  
import { connect, connection } from 'mongoose'; 
connect('mongodb://localhost:3000/poll_database'); 
// poll_database je naziv baze u mongoDBu u kojoj se spremaju pollovi, promijeni ako je potrebno
var db=connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 

var app = express()

//nesto trenutno ne radi ovde, nisan siguran kako popravit
app.use(json()); 
app.use(static('/public')); 
app.use(urlencoded({ 
    extended: true
})); 

app.post('/add_poll', function(req,res){ 
    var name = req.body.poll; 

    var data = {
        "poll": poll
    }

    db.collection('details').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
              
    }); 
          
    return res.redirect('signup_success.html'); 
}) 
  
  
app.get('/',function(req,res){ 
res.set({ 
    'Access-control-Allow-Origin': '*'
    }); 
return res.redirect('index.html'); 
}).listen(3000) 
  
  
console.log("server listening at port 3000"); 