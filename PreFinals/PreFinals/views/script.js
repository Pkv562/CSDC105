
document.getElementById('searchInput').addEventListener('input', filterBlogs);

function filterBlogs() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    document.querySelectorAll('.blog-card').forEach(blog => {
        const title = blog.getAttribute('data-title');
        const content = blog.textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || content.includes(searchTerm);
        
        if (matchesSearch) {
            blog.style.display = 'block';
        } else {
            blog.style.display = 'none';
        }
    });
}


document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        
        if(confirm('Are you sure you want to delete this blog?')) {
            fetch(`/blogs/delete/${id}`, {
                method: 'POST',
            })
            .then(response => response.json())
            .then(data => {
                window.location.href = data.redirect;
            })
            .catch(err => console.log(err));
        }
    });
});