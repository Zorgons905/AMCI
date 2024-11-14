document.getElementById('logoutButton').addEventListener('click', function () {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    
    // Optionally show a message or redirect to the login page
    alert('You have been logged out.');
    window.location.href = 'login/index.html'; // Redirect to login page
});