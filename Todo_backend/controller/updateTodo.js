const Todo = require("../model/todo");







exports.updatedTodo= async(req,res)=>{
    try {
        const id= req.params.id;
        const{ title, description}= req.body;
        const response = await Todo.findByIdAndUpdate(
            {_id:id},
            {
                title,description, updatedAt:Date.now()
            }
            );

        if(!response)
        {
            return res.status(404).json({
                success:false,
                message:"No Data Found woth Given Id",
            })
        }
    
        res.status(200).json({
          success: true,
          data: response,
          message: "entry successful",
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          data: "internal server error",
          message: error.message,
        });
      }

}
