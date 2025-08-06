const express=require('express');
const { deleteResource, updateResource, getResourceById, getResources, createResource } = require('../controllers/resourceController');

 const resourceRoute=express.Router()


resourceRoute.post('/resources',createResource);
resourceRoute.get('/resources', getResources);
resourceRoute.get('/resources/:id', getResourceById);
resourceRoute.put('/resources/:id',updateResource);
resourceRoute.delete('/resources/:id',deleteResource);

module.exports=resourceRoute;