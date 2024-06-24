const express = require('express');
const articleRouter = require('./routes/articles');
const Article= require('./models/article')
const mongoose = require('mongoose');
const methodOverride=require('method-override');
const app = express();

mongoose.connect('mongodb://localhost/bharatInternDatabase', {
    connectTimeoutMS: 10000, // 10 seconds
    socketTimeoutMS: 45000, // 45 seconds
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

app.set('view engine', 'ejs');
app.set("views", "./views")
app.use(express.urlencoded({ extended:false}));
app.use(methodOverride('_method'));

app.get('/',async(req, res) => {
    const articles = await Article.find().sort({ createdAt:'desc'})
    res.render('articles/index', { articles:articles }); // Pass the articles array to the template
});

app.use('/articles', articleRouter);
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
