const Blog = require('../models/models.js');

// Display the home page with the first 3 blogs
const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 }).limit(3)
        .then((result) => {
            res.render('index', { title: 'Home', blogs: result });
        })
        .catch((err) => {
            console.log(err);
        });
};

// Display all blogs
const blog_index_all = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs', { title: 'All Blogs', blogs: result });
        })
        .catch((err) => {
            console.log(err);
        });
};

// Display create blog form
const blog_create_get = (req, res) => {
    res.render('create', { title: 'Create a New Blog' });
};

// Handle create blog form submission
const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
};

// Display single blog details
const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: 'Blog Details' });
        })
        .catch(err => {
            res.status(404).render('404', { title: '404' });
        });
};

// Display edit blog form
const blog_edit_get = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('edit', { blog: result, title: 'Edit Blog' });
        })
        .catch(err => {
            res.status(404).render('404', { title: '404' });
        });
};

// Handle edit blog form submission
const blog_update_post = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndUpdate(id, req.body)
        .then(result => {
            res.redirect('/blogs');
        })
        .catch(err => {
            console.log(err);
        });
};

// Handle blog deletion
const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    blog_index,
    blog_index_all,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_edit_get,
    blog_update_post,
    blog_delete
};