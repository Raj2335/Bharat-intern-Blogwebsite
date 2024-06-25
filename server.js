const express = require('express');
const articleRouter = require('./routes/articles');
const Article = require('./models/article');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bharatInternDatabase', {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

// Middleware and settings
app.set('views', './views');  // Fixed typo from "./viewS" to "./views"
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Routes
app.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: 'desc' });
    res.render('articles/index', { articles: articles });
  } catch (err) {
    console.error('Error fetching articles', err);
    res.status(500).send('Internal Server Error');
  }
});

app.use('/articles', articleRouter);

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
