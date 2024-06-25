const express = require ('express')
const articleRouter = require("./routes/articles")
const Article = require('./models/article')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/bharatInternDatabase')
//mongodb://localhost:27017/
app.set("views", "./viewS")
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.get('/', async(req, res) => {
    const articles =await Article.find().sort({ createdAt:'desc'})
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.use('/articles', articleRouter);
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
