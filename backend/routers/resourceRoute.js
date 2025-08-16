const express=require('express');
const { deleteResource, updateResource, getResourceById, getResources, createResource, incrementViews, likeResource, dislikeResource } = require('../controllers/resourceController');

 const resourceRoute=express.Router()


resourceRoute.post('/resources',createResource);
resourceRoute.get('/resources', getResources);
resourceRoute.get('/resources/:id', getResourceById);
resourceRoute.put('/resources/:id',updateResource);
resourceRoute.delete('/resources/:id',deleteResource);
resourceRoute.put('/resources/:id/view', incrementViews );
resourceRoute.post('/resources/:id/like', likeResource );
resourceRoute.post('/resources/:id/dislike', dislikeResource);
module.exports=resourceRoute;