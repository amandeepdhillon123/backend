const Post = require("../model/postModel");
const Comment = require("../model/commentModel");

exports.createComment = async (req, res) => {
  try {
    const { user, body, post } = req.body;

    const commentPost = new Comment({
      user,
      body,
      post,
    });

    const savedComment = await commentPost.save();

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } },
      { new: true }
    )
      .populate("comments")
      .exec();

    res.status(200).json({
      data: updatedPost,
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      error: "error while creating comment",
    });
  }
};

exports.delComment= async(req,res)=>{
    try {
        const {post,comment}= req.body;

    const delComment= await Comment.findOneAndDelete({post,_id:comment})


    const updatePost = await Post.findByIdAndUpdate(post,{$pull:{comments:delComment._id}}, {new:true})

    res.status(200).json({
        psot:updatePost
    })
    } catch (error) {
         res.status(400).json({
            error:"probelms in deleing comments"
         })
    }
}
