const Todo = require("../model/todo");

exports.getTodo = async (req, res) => {
  try {
    const response = await Todo.find();

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

  // console.log(req.body);
};



// get todo find by id 

exports.getTodoById= async(req,res)=>{
    try {
        const id= req.params.id;
        const response = await Todo.findById({_id:id});

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
