const Post = require("../model/postModel");
const Like = require("../model/likeModel");

exports.createLike = async (req, res) => {
  try {
    const { post, user } = req.body;

    const savedLike = new Like({ post, user });

    const data = await savedLike.save();

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: data._id } },
      { new: true }
    )
      .populate("likes")
      .exec();

    res.status(200).json({
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      error: "error while creating like",
    });
  }
};

exports.deleteLike = async (req, res) => {
  try {
    const { post, like } = req.body;

    const delLike = await Like.findOneAndDelete({ post, _id: like });

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $pull: { likes: delLike._id } },
      { new: true }
    )
    

    res.status(200).json({
      data: updatedPost,
    });
  } catch (error) {
    res.status(400).json({
      error: "error while creating deleting like",
    });
  }
};
