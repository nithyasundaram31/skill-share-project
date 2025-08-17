const express=require('express');
const { deleteResource, updateResource, getResourceById, getResources, createResource, incrementViews,  toggleLike } = require('../controllers/resourceController');

 const resourceRoute=express.Router()


resourceRoute.post('/resources',createResource);
resourceRoute.get('/resources', getResources);
resourceRoute.get('/resources/:id', getResourceById);
resourceRoute.put('/resources/:id',updateResource);
resourceRoute.delete('/resources/:id',deleteResource);
resourceRoute.put('/resources/:id/view', incrementViews );
resourceRoute.put('/like/:id', toggleLike );
// resourceRoute.post('/resources/:id/dislike', dislikeResource);
module.exports=resourceRoute;