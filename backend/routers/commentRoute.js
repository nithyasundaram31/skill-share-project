const express=require('express');
const { createComment, getCommentsByResource, deleteComment } = require('../controllers/commentController');

const commentRoute=express.Router();

commentRoute.post('/comments', createComment);
commentRoute.get('/comments/:resourceId', getCommentsByResource);
commentRoute.delete('/comments/:id', deleteComment);

module.exports=commentRoute;