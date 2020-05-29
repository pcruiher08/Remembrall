const Tweet = require('../models/Tweet');
const moment = require('moment');

exports.indexPage = async (req, res) => {
	try {
		const tweets = await Tweet.find({ })
		.populate('author')
		.limit(50)
		.sort({ created: 'desc' });
		res.render('index', { tweets, moment });

	} catch (e) {
		console.log(e);
		res.redirect('/error')
	}

}
