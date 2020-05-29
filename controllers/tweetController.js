const Tweet = require('../models/Tweet');
const moment = require('moment');

exports.postTweet = async (req, res) => {
	try {
		req.body.author = req.user._id;
		console.log(req.body)
		const tweet = new Tweet(req.body);
		await tweet.save();  
		res.redirect('back');


	} catch (e) {
		console.log(e);
		res.redirect('/?msg=Failed to remember')
	}
}



exports.patchTweet = async (req, res) => {
	try {
		console.log("estoy patcheando")
		var mensaje = "editado"
		console.log(mensaje);
		console.log(req.body)

		const tweet = await Tweet.findOneAndUpdate({ _id: req.params.id },{tweet: mensaje});

		
		res.redirect('back')
	} catch (e) {
		console.log(e);
		res.redirect('/?msg=Failed to patch')
	}


}



const confirmedOwner = (tweet, user) => {
	if(!tweet.author.equals(user._id)) {
		throw Error('You don\'t have permission to delete this')
	}
}


exports.deleteTweet = async (req, res) => {
	try {
		console.log(req.body)
		const tweet = await Tweet.findOne({ _id: req.params.id });
		if(!req.user.username === 'pcruiher08') {			
			confirmedOwner(tweet, req.user);
		}

		const deleteTweet = await Tweet.deleteOne(tweet);
		res.redirect('back')
	} catch (e) {
		console.log(e);
		res.redirect('/?msg=Failed to delete')
	}


}

exports.singleTweetPage = async (req, res) => {
	try {
		const tweet = await Tweet.findOne({ _id: req.params.id }).populate('author');
		res.render('single', { tweet, moment });
		
	} catch (err) {
		console.log(err);
		res.redirect('/?msg=No tweets found')
	}

}