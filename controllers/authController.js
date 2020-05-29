const passport = require('passport');

exports.login = passport.authenticate('local', {
	failureRedirect: '/?msg=login failure',
	successRedirect: '/?msg=logged in'
});

exports.logout = (req, res) => {
	req.logout();
	res.redirect('/?msg=logged out')
}

exports.isLoggedIn = (req, res, next) => {
	if(!req.isAuthenticated()) {
		res.redirect('/?msg=please log in');
		return;
	}

	next();
}
