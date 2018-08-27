const Router  = require('express').Router();

Router.get('/',(req,res) => {
	if(!req.session.user) {
		res.redirect('/signup');
	}else{
		res.redirect('/dashboard');
	}
})


Router.get('/signup' , (req , res) => {
    res.render('signup' , {errors : []})
})


Router.get('/login',(req,res) => {
	if(!req.session.user) {
		res.render('login',{errors: []})
	}else{
		res.redirect('/dashboard');
	}
})

module.exports = Router;