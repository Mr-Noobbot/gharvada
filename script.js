// Select all the circles (snake lines)
const circles = document.querySelectorAll('.snake-line');

// Set initial speed and directions for circles (very slow speed initially)
let directions = Array.from({ length: circles.length }, () => ({
    x: Math.random() > 0.5 ? 1 : -1,
    y: Math.random() > 0.5 ? 1 : -1,
    speedX: Math.random() * 0.2 + 0.1,  // very slow speed between 0.1 and 0.3
    speedY: Math.random() * 0.2 + 0.1,  // very slow speed between 0.1 and 0.3
}));

// Array to track the last time a circle rebounded (in milliseconds)
let lastReboundTime = Array(circles.length).fill(0);
const reboundDelay = 5000; // 5 seconds

// Function to check collision between two circles
function checkCollision(circle1, circle2) {
    const rect1 = circle1.getBoundingClientRect();
    const rect2 = circle2.getBoundingClientRect();

    const dx = rect1.left + rect1.width / 2 - (rect2.left + rect2.width / 2);
    const dy = rect1.top + rect1.height / 2 - (rect2.top + rect2.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    return distance < (rect1.width / 2 + rect2.width / 2); // if distance is less than sum of radii
}

// Function to handle the movement, bouncing, and collision of circles
function animateCircles() {
    circles.forEach((circle, index) => {
        const rect = circle.getBoundingClientRect();
        const circleWidth = rect.width;
        const circleHeight = rect.height;

        let currentLeft = parseFloat(circle.style.left) || 0;
        let currentTop = parseFloat(circle.style.top) || 0;

        // Update positions based on direction and speed
        currentLeft += directions[index].x * directions[index].speedX;
        currentTop += directions[index].y * directions[index].speedY;

        // Check collision with other circles
        circles.forEach((otherCircle, otherIndex) => {
            if (index !== otherIndex && checkCollision(circle, otherCircle)) {
                const currentTime = Date.now();
                
                // Only allow rebounding if 5 seconds have passed since the last rebound
                if (currentTime - lastReboundTime[index] > reboundDelay && currentTime - lastReboundTime[otherIndex] > reboundDelay) {
                    // Reverse directions and increase speed after collision
                    directions[index].x *= -1;
                    directions[index].y *= -1;
                    directions[otherIndex].x *= -1;
                    directions[otherIndex].y *= -1;

                    // Increase speed after collision
                    directions[index].speedX *= 1.1; // increase speed by 10%
                    directions[index].speedY *= 1.1; // increase speed by 10%
                    directions[otherIndex].speedX *= 1.1; // increase speed by 10%
                    directions[otherIndex].speedY *= 1.1; // increase speed by 10%

                    // Update last rebound time for both circles
                    lastReboundTime[index] = currentTime;
                    lastReboundTime[otherIndex] = currentTime;
                }
            }
        });

        // Bounce logic (when hitting the container boundaries)
        if (currentLeft + circleWidth >= window.innerWidth / 2 || currentLeft <= 0) {
            directions[index].x *= -1;  // Reverse X direction
        }
        if (currentTop + circleHeight >= window.innerHeight || currentTop <= 0) {
            directions[index].y *= -1;  // Reverse Y direction
        }

        // Ensure circle stays within the left half of the screen
        if (currentLeft < 0) currentLeft = 0;
        if (currentTop < 0) currentTop = 0;
        if (currentLeft + circleWidth > window.innerWidth / 2) currentLeft = window.innerWidth / 2 - circleWidth;
        if (currentTop + circleHeight > window.innerHeight) currentTop = window.innerHeight - circleHeight;

        // Update circle position
        circle.style.left = `${currentLeft}px`;
        circle.style.top = `${currentTop}px`;
    });
}

// Initialize the circles' positions randomly on the left half of the screen
circles.forEach((circle, index) => {
    // Set random positions within the left half of the window
    circle.style.left = `${Math.random() * (window.innerWidth / 2)}px`;
    circle.style.top = `${Math.random() * window.innerHeight}px`;

    // Set random sizes for each circle (between 30px and 100px)
    const randomSize = Math.random() * 70 + 30;
    circle.style.width = `${randomSize}px`;
    circle.style.height = `${randomSize}px`;
});

// Start animation immediately
setInterval(animateCircles, 30); // Start the animation loop immediately
// Mock user accounts stored in localStorage (for demo purposes)
const mockUsers = [
    { email: "testuser@example.com", password: "password123" }
];

// Function to show the signup page (redirects to signup.html)
function showSignup() {
    window.location.href = "signup.html"; // You can create a signup.html page later
}

// Function to handle login
function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorMessage = document.getElementById('error-message');

    // Basic validation
    if (email === "" || password === "") {
        alert("Please fill in all fields!");
        return;
    }

    // Check if the account exists in the mock users list
    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (user) {
        // If account exists, login successful
        alert("Login Successful!");
        localStorage.setItem('loggedIn', 'true'); // Store login status
        window.location.href = "index.html"; // Redirect to home page (you can modify as needed)
    } else {
        // If account doesn't exist, show error message and prompt to create a new account
        errorMessage.style.display = "block";
    }
}
