const Todo= require("../model/todo")


exports.createTodo =async(req,res)=>{
try {
    
    
    const{title, description}= req.body;

    const response = await Todo.create({title,description});

    res.status(200).json({
         success:true,
          data:response,
          message:"entry successful"
    })
} catch (error) {

    console.log(error);
    res.status(500).json({
        success:false,
        data:"internal server error",
        message:error.message

    })
    
}

    // console.log(req.body);
}