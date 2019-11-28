var express=require("express");
var Joi=require("joi");
var mysql=require("mysql");
var config=require("config");
var router=express();

var connection=mysql.createConnection({
    host:config.get("host"),
    database:config.get("database"),
    user:config.get("user"),
    password:config.get("password")
})

connection.connect();
router.use(express.json());

router.get("/",(request,response)=>{
    

    var queryText="select * from Stu";
    connection.query(queryText,(err,result)=>
    {
        if(err==null)
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            response.send(JSON.stringify(err));
        }
    })
})

router.get("/:No",(request,response)=>
{

   var queryText=`select * from Stu where No=${request.params.No}`;
   connection.query(queryText,(result,err)=>{
       if(err==null)
       {
           response.send(JSON.stringify(result));
       }
       else
       {
        response.send(JSON.stringify(err));
       }
   }) 
})

router.post("/",(request,response)=>{

    var validateresult=validate(request);

    if(validateresult.error==null)
    {
    var No=request.body.No;
    var Name=request.body.Name;
    var Address=request.body.Address;

    var queryText=`insert into Stu values(${No},'${Name}','${Address}')`;
    connection.query(queryText,(err,result)=>
    {
            response.send(JSON.stringify(result));
    })
}
        
     else
        {
            response.send(JSON.stringify(validateresult.error)); 
        }
    
})

function validate(request)
{
  var validationSchema=
  {
      No:Joi.number().required(),
      Name:Joi.string().required(),
      Address:Joi.string().required()

  }  

  return Joi.validate(request.body,validationSchema);
}

router.put("/:No",(request,response)=>{
    var No=request.params.No;
    var Name=request.body.Name;
    var Address=request.body.Address;

    var queryText=`update Stu set Name='${Name}',Address='${Address}' where No=${No}`;
    connection.query(queryText,(err,result)=>{
        if(err==null)
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            response.send(JSON.stringify(err)); 
        }
    })
})


router.delete("/:No",(request,response)=>{
    var No=request.params.No;
    var queryText=`delete from Stu where No=${No}`;
    connection.query(queryText,(err,result)=>{
        if(err==null)
        {
            response.send(JSON.stringify(result));  
        }
        else
        {
            response.send(JSON.stringify(err));  
        }
    })
})


module.exports=router;