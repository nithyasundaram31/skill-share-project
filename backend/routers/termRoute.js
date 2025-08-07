const express =require('express');
const { getTerms, createTerm, updateTerm, deleteTerm } = require('../controllers/termController');

// const   authenticate  = require('../middlewares/auth');



const termRoute = express.Router();
termRoute.post('/',createTerm);
termRoute.get('/',getTerms);
termRoute.put('/:id',updateTerm);
termRoute.delete('/:id', deleteTerm);

module.exports=termRoute;