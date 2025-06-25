document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
    const postError = document.getElementById('post-error');
    const postsContainer = document.getElementById('posts');

    // Fetch and display posts
    function fetchPosts() {
        fetch('/api/posts')
            .then(response => response.json())
            .then(posts => {
                postsContainer.innerHTML = '';
                if (posts.length === 0) {
                    postsContainer.innerHTML = '<p>No posts yet.</p>';
                    return;
                }
                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.className = 'post';
                    postElement.innerHTML = `
                        <strong>${post.username}</strong> <small>${new Date(post.timestamp).toLocaleString()}</small>
                        <p>${post.message}</p>
                    `;
                    postsContainer.appendChild(postElement);
                });
            })
            .catch(error => {
                postError.textContent = 'Error loading posts: ' + error.message;
            });
    }

    // Submit new post
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!username || !message) {
            postError.textContent = 'Please fill in all fields.';
            return;
        }

        fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, message })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    postError.textContent = data.error;
                    return;
                }
                postError.textContent = '';
                postForm.reset();
                fetchPosts(); // Refresh posts
            })
            .catch(error => {
                postError.textContent = 'Error posting: ' + error.message;
            });
    });

    // Initial fetch
    fetchPosts();
});