const socket = io();
let username;

const usernameContainer = document.getElementById('username-container');
const chatContainer = document.getElementById('chat-container');
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Show username input form and hide chat container initially
usernameContainer.style.display = 'block';
chatContainer.style.display = 'none';

// Event listener for submitting username
document.getElementById('username-submit').addEventListener('click', () => {
    username = document.getElementById('username').value.trim();
    if (username) {
        usernameContainer.style.display = 'none';
        chatContainer.style.display = 'block';
    }
});

// Event listener for sending messages
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (message) {
        // Emit the chat message event with username
        socket.emit('chat message', { username, message });
        input.value = '';
    }
});

// Receive and display messages
socket.on('chat message', ({ username, message }) => {
    const item = document.createElement('li');
    item.textContent = `${username}: ${message}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
