const express = require('express');
const cors=require('cors');
const session = require('express-session');
const dataservice=require('./services/data.services')
const app=express();
app.use(express.json())
app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}))

app.post('/register',(req,res)=>{
    console.log("uname is "+req.body.uname);
    dataservice.register(req.body.uname,req.body.password).then((result)=>{
        res.status(result.statuscode).json(result)
    })
})
// app.get('/idiot',(req,res)=>{
//     console.log("uname is "+req.body.uname);
//     dataservice.idiot().then((result)=>{
//         res.status(result.statuscode).json(result)
//     })
// })
app.post('/login',(req,res)=>{
    dataservice.login(req.body.uname,req.body.password).then(result=>{
        res.status(result.statuscode).json(result)
    })

})
app.patch('/adddata',(req,res)=>{
    dataservice.add_data(req.body.uname,req.body.data1).then(result=>{
        res.status(result.statuscode).json(result)
    })
})

app.patch('/delete',(req,res)=>{
    dataservice.deletedata(req.body.uname,req.body.message).then(result=>{
        res.status(result.statuscode).json(result)
    })

})

app.patch('/reset',(req,res)=>{
    dataservice.reset_data(req.body.uname).then(result=>{
        res.status(result.statuscode).json(result)
    })

})

app.get('/getdata/:uname',(req,res)=>{
    dataservice.getdata(req.params.uname).then(result=>{
        res.status(result.statuscode).json(result)
    })
})

app.listen(3000,()=>{
    console.log("listening");
})