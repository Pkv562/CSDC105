const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Blog = require('./views/models/models.js');
const blogController = require('./views/controllers/blogController.js');

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// MongoDB Connection
const dbURI = 'mongodb+srv://netninja:0Bf3wF5qyVJVdQWo@cluster0.39btmt4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000, () => console.log('Connected to DB and PORT: 3000')))
    .catch((err) => console.log(err));

// Routes
app.get('/', blogController.blog_index);
app.get('/blogs', blogController.blog_index_all);
app.get('/blogs/create', blogController.blog_create_get);
app.post('/blogs', blogController.blog_create_post);
app.get('/blogs/:id', blogController.blog_details);
app.get('/blogs/edit/:id', blogController.blog_edit_get);
app.post('/blogs/update/:id', blogController.blog_update_post);
app.post('/blogs/delete/:id', blogController.blog_delete);
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: "404" });
});