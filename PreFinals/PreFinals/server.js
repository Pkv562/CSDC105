const express = require('express');
const path = require('path'); // Import path module

const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'views')));

// Start the server
app.listen(3000, () => console.log(`Connected to PORT: 3000`));

// Home Page
app.get('/', (req, res) => {
    const blogs = [     
        { 
            title: 'D.Va: More Than Just a Gamer', 
            snippet: 'Exploring D.Va’s journey from esports champion to battlefield hero and her impact on Overwatch’s lore.',
            image: 'assets/DVA.jpg' 
        },
        { 
            title: 'The Heart of Overwatch: Mercy’s Legacy', 
            snippet: 'How Dr. Angela Ziegler’s compassion and cutting-edge technology have shaped the world of Overwatch.',
            image: 'assets/mercy.jpg' 
        },
        { 
            title: 'Reinhardt’s Code: Honor in the Heat of Battle', 
            snippet: 'The story of Reinhardt Wilhelm and the chivalric ideals that make him one of Overwatch’s most inspiring heroes.',
            image: 'assets/Reinhardt.avif' 
        },
    ];
    
    res.render('index', { title: "Home", blogs });
});

// About Page
app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
});

// Redirect /about-us to /about
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// Routing for create
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: "Create" });
});

// Page not found (404)
app.use((req, res) => {
    res.status(404).render('404', { title: "404" });
});
