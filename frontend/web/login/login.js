document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            messageElement.style.color = 'green';
            messageElement.innerText = 'Login successful!';
            localStorage.setItem('token', data.token); // Store the JWT in localStorage
            
            setTimeout(() => {
                window.location.href = '../home/index.html';
            }, 1000);

        } else {
            messageElement.style.color = 'red';
            messageElement.innerText = data.message || 'Login failed';
        }

    } catch (error) {
        console.error('Error during login:', error);
        messageElement.style.color = 'red';
        messageElement.innerText = 'An error occurred. Please try again later.';
    }
});
