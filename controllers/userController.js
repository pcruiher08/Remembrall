const User = require('../models/User');
const Tweet = require('../models/Tweet');
const promisify = require('es6-promisify');
const moment = require('moment');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

exports.registerPage = (req, res) => {
	res.render('register');
}

exports.profilePage = async (req, res) => {
	try {
		const reqUser = await User.findOne({ username: req.params.username });

		if(reqUser) {
			const tweets = await Tweet.find({ author: reqUser._id }).populate('author').sort({ created: 'desc' });

			res.render('profile', { reqUser, tweets, moment });
			return;
		}



	} catch (e) {
		console.log(e);
		res.redirect('/')
	}
}

exports.accountPage = async (req, res) => {
	const user = await User.findOne({ _id: req.user._id });
	res.render('account', { user })
}

exports.accountUpdate = async (req, res) => {
	try {
			const updates = {
			name: req.body.name,
			email: req.body.email,
			website: req.body.website,
			bio: req.body.bio,
			avatar: req.body.avatar || req.user.avatar
		}

	const user = await User.findOneAndUpdate(
		{ _id: req.user._id },
		{ $set: updates },
		{ new: true, runValidators: true, context: 'query' }
	)

	res.redirect('/account?msg=updated')
} catch(e) {
	console.log(e);
	res.redirect('back')
	}
}

const multerOptions = {
	storage: multer.memoryStorage(),
	fileFilter(req, file, next) {
		const isImage = file.mimetype.startsWith('image/');
		if(isImage) {
			next(null, true);
		} else {
			next({message: 'Invalid image.'}, false)
		}
	}
}
exports.upload = multer(multerOptions).single('avatar');
exports.resize = async (req, res, next) => {
	if(!req.file) {
		next();
		return;
	}
	const extension = req.file.mimetype.split('/')[1];
	req.body.avatar = `${uuid.v4()}.${extension}`;
	const image = await jimp.read(req.file.buffer);
	await image.resize(300, 300);
	await image.write(`./public/uploads/${req.body.avatar}`);
	next();
}

exports.verifyRegister = async (req, res, next) => {
	req.sanitizeBody('username');
	req.checkBody('username', 'Empty username').notEmpty();
	req.sanitizeBody('email');
	req.checkBody('email', 'Email is empty').notEmpty();
	req.checkBody('email', 'Invalid email').isEmail();
	req.checkBody('password', 'Password is empty').notEmpty();
	req.checkBody('password-confirm', 'Password confirmation is empty').notEmpty();
	req.checkBody('password-confirm', 'Passwords does not match').equals(req.body.password);

	const errors = req.validationErrors();
	if(errors) {
		console.log(errors);
		res.redirect('back')
		return;
	}
	next();
}

exports.checkUserExists = async (req, res, next) => {
	const user = await User.find({
		username: req.body.username,
		email: req.body.email
	})


	if(user.length) {
		res.send('Credentials taken.');
		return;
	}
		next();
}

exports.registerUser = async (req, res, next) => {
	try {
		const user = new User({ username: req.body.username, email: req.body.email });

		const register = promisify(User.register, User);
		await register(user, req.body.password);
		next();

	} catch(error) {
		res.redirect('/register');
		console.log(error);
	}
}

exports.searchTweets = async (req, res) => {
	await Tweet.find({$text: {$search: decodeURI(req.query.query)}})
		.populate('author')
		.sort({ created: 'desc' })
	   .exec(function(err, docs) {
			results = docs;
			data = {
				query : req.query.query,
				results : results
			};
			res.render('search', { data, moment });
	   });
}


exports.heartTweet = async (req, res) => {
	const hearts = req.user.hearts.map(obj => obj.toString());
	const operator = hearts.includes(req.params.id) ? '$pull' : '$addToSet';
	const user = await User.findByIdAndUpdate(
		req.user._id,
		{ [operator] : { hearts: req.params.id } },
		{ new: true }
	);
}



