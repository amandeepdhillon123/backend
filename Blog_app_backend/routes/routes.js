const express = require("express");

const router= express.Router();

const{createPost, getAllPost}= require("../controller/postController");
const{createLike, deleteLike}= require("../controller/likeController")
const{createComment,delComment}=require("../controller/commentController")

router.post('/createPost',createPost)
router.post('/likes',createLike)
router.post('/likes/unlike',deleteLike);
router.post('/comment',createComment);
router.post('/delete',delComment);
router.get("/getAllPost",getAllPost);



module.exports= router;

