const express =require('express');
const { createCategory, updateCategory, deleteCategory, getCategories } = require('../controllers/categoryController');
// const   authenticate  = require('../middlewares/auth');

const categoryRoute = express.Router();
categoryRoute.post('/categories', createCategory);
categoryRoute.get('/categories', getCategories);
categoryRoute.put('/categories/:id', updateCategory);
categoryRoute.delete('/categories/:id', deleteCategory);



module.exports=categoryRoute;