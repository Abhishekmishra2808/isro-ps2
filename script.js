const chatContainer = document.getElementById('chatContainer');
const welcomeScreen = document.getElementById('welcomeScreen');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
let conversationStarted = false;

function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function adjustTextareaHeight() {
    const textarea = messageInput;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
}

function sendSuggestion(message) {
    sendMessage(message);
}

// Gemini API integration
async function getGeminiResponse(userMessage) {
    const apiKey = 'AIzaSyCl9nPK-mUNIHKwLv1wLr1KJe0BcFNg_tA';
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent';
    const body = {
        contents: [
            { parts: [{ text: userMessage }] }
        ]
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': apiKey
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        if (!response.ok) {
            // Show the error message from the API
            return 'Error contacting Gemini API: ' + (data.error?.message || response.status);
        }
        return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
    } catch (error) {
        return 'Error contacting Gemini API: ' + error.message;
    }
}

function sendMessage(predefinedMessage = null) {
    const message = predefinedMessage || messageInput.value.trim();
    
    if (!message) return;

    // Hide welcome screen on first message
    if (!conversationStarted) {
        welcomeScreen.style.display = 'none';
        conversationStarted = true;
    }

    // Add user message
    addMessage(message, 'user');
    
    // Clear input
    messageInput.value = '';
    adjustTextareaHeight();
    
    // Show typing indicator
    showTypingIndicator();
    
    // Use Gemini for bot response
    getGeminiResponse(message).then((response) => {
        hideTypingIndicator();
        addMessage(response, 'assistant');
    });
}

function addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-container ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = sender === 'user' ? 'U' : 'M';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = content;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message-container assistant';
    typingDiv.id = 'typingIndicator';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = 'M';
    
    const typingContent = document.createElement('div');
    typingContent.className = 'message-content';
    
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.innerHTML = `
        <span>MOSDAC Assistant is typing</span>
        <div class="typing-dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    `;
    
    typingContent.appendChild(indicator);
    typingDiv.appendChild(avatar);
    typingDiv.appendChild(typingContent);
    
    chatContainer.appendChild(typingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function startNewChat() {
    chatContainer.innerHTML = '';
    chatContainer.appendChild(welcomeScreen);
    welcomeScreen.style.display = 'flex';
    conversationStarted = false;
    messageInput.value = '';
    adjustTextareaHeight();
}

// Initialize
adjustTextareaHeight();
