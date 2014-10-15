var express = require("express"),
app = express()  ,
bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


var articles = [];
var count = 1;

app.get('/index', function(req,res){
	res.render('site/index');
});

app.get('/about', function(req,res){
	res.render('site/about');
});

app.get('/contact', function(req,res){
	res.render('site/contact');
});

app.get('/articles/articles', function(req,res){
	res.render('articles/articles');
});

app.get('/articles/newarticle', function(req,res){
	res.render('articles/newarticle');
});

app.post('/articles', function(req,res){
	console.log("SO YOU WANT TO WRITE AN ARTICLE?");
	var article = {};
	article.id = count;
	article.title = req.body.article.title;
	article.author = req.body.article.author;
	article.body = req.body.article.body;
	articles.push(article);
	count++;
	console.log(articles);
	res.render('articles/articles', {allArticles:articles});
});

app.get('/articles/:id', function(req,res){
	var articleId = Number(req.params.id);
	var foundArticle;
	articles.forEach(function(article){
		if(article.id === articleId) {
			foundArticle = article;
		}
	});
res.render('articles',{article:foundArticle});
});


app.listen(3000, function(){
	console.log("Server is listening on port 3000");
});