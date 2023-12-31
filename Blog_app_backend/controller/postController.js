const Post = require("../model/postModel");

exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;

    const response = new Post({ title, body });

    const saveData = await response.save();

    res.status(200).json({
      data: saveData,
    });
  } catch (error) {
    res.status(400).json({
        error:"Error while creating post"
    })
  }
  // console.log(req.body);
};


exports.getAllPost= async(req,res)=>{
    try {
        const post = await Post.find({}).populate("likes").populate("comments").exec();
        res.status(200).json({
            post
        })
    } catch (error) {
        res.status(400).json({
            error:"error while getting all post"
        })
        
    }
   
   
}