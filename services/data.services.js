const db=require('../services/db')

const register=(uname,password)=>{
return db.Data.findOne({uname}).then((result)=>{
    if(result){
        return{
            status:false,
            statuscode:422,
            message:"already exist"
        }
    }
    else{
        
        const newuser =new db.Data({
            uname,
            password,
            data:[]
        })
        newuser.save()
        return{
            status:true,
            statuscode:200,
            message:"sucess"
        }
    }
})
}

const login=(uname,password)=>{
return db.Data.findOne({uname}).then(result=>{
    if(result){
        if(result.password==password){
            return{
                status:true,
                statuscode:200,
                message:"login sucess",
                uname:result.uname
            }
        }
        else{
            return{
                status:false,
                statuscode:422,
                message:"invalid password"
            
            }
        }
    }
    else{
        return{
            status:false,
            statuscode:422,
            message:"invalid credentials"
        }
    }
})
}
 const getdata=(uname)=>{
     return db.Data.findOne({uname}).then(result=>{
         if(result){
             return{
                status:true,
                statuscode:200,
                message:"sucess",
                tododata:result.data
             }
         }
         else{
             return{
                status:false,
                statuscode:422,
                message:"invalid credentials"
             }
         }
     })
 }

const add_data=(uname,data1)=>{
   return db.Data.updateOne(
        { uname: uname },
        { $push: { data: data1 } }
     ).then(result=>{
         
         if(result){
             return{
                status:true,
                statuscode:200,
                message:"sucess",
                
             }
         }
         else{
            return{
                status:false,
                statuscode:422,
                message:"invalid "
            }
        }
     })

}
 const deletedata=(uname,message)=>{
    return db.Data.updateOne({uname},{"$pull" : {"data" :{$in:[message]}}}).then(result=>{
        if(result){
            return{
                status:true,
                statuscode:200,
                message:"sucess"
            }
        }
        else{
            return{
                status:false,
                statuscode:422,
                message:"false"
            }
        }
    })
 }
const reset_data=(uname)=>{
    return db.Data.updateOne({uname},{$set:{"data":[]}}).then(result=>{
        if(result){
            return{
                status:true,
                statuscode:200,
                message:"sucess"
            }
        }
        else{
            return{
                status:false,
                statuscode:422,
                message:"false"
            }
        }
    })
}

module.exports={
    register,
    login,
    add_data,
    deletedata,
    getdata,
    reset_data,
    
    
}