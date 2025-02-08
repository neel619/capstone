document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Client-side validation
    if (!email || !password) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Simulate server request (replace with actual server call)
    setTimeout(() => {
        if (email === 'user@example.com' && password === 'password') {
            // Redirect to home page upon successful login
            window.location.href = 'index.html';
        } else {
            alert('Invalid email or password. Please try again.');
        }
    }, 1000);
});
