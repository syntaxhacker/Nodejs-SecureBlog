//localhost:3000/auth/local/<Route>
const Router = require('express').Router(),
    bcrypt 	 = require('bcryptjs'),
	User = require('../../Model/user.model'),
	salt 	 = bcrypt.genSaltSync(10);

Router.post('/signup',(req,res) => {
	let errors = [];
	let usernameAlreadyChosen = false;
	let usernameIsGood = req.body.username.length > 5;
	let passwordIsGood = req.body.password.length > 5;
	let emailIsGood = req.body.email.length > 8;
	if(!usernameIsGood) errors.push('username field must be filled');
	if(!passwordIsGood) errors.push('password field must be filled');
	if(!emailIsGood) errors.push('email field must be filled');

	User.findOne({ username: req.body.username }).then((user) => {
		if(user){
			usernameAlreadyChosen = true;
			errors.push('username',req.body.username,'is already in use');
		}else{
			usernameAlreadyChosen = false;
		}
	}).then(() => {
		if(errors.length > 0) {
			res.render('signup',{errors,})
		}else{
			let newuser = new User;
			newuser.username = req.body.username;
			newuser.email = req.body.email;
			newuser.password = bcrypt.hashSync(req.body.password,salt);
			newuser.profile_pic = req.body.profile_pic;

			newuser.followers.push(req.body.username);
			newuser.people_you_are_following.push(req.body.username);
			newuser.save((user) =>{
				req.session.user = user;
                res.redirect('/dashboard');
			})
		}
	}) ;
});


Router.post('/login' ,(req , res) => {
	let errors = [];
	User.findOne({ username: req.body.username }).then((user) => {
		let userExists = user;
		if(userExists && (bcrypt.compareSync(req.body.password, user.password) === true)){
			req.session.user = user ;
			res.redirect('/dashboard');
			
		} else {
			errors.push('could log in');
			res.render('login',{ errors , } )
		}
		
	}).catch((err) => {
		errors.push("user doesnt exist");
		res.render('login' , {errors , });
	})
})

module.exports = Router;