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
    
    // Simulate bot response
    setTimeout(() => {
        hideTypingIndicator();
        const response = getMOSDACResponse(message);
        addMessage(response, 'assistant');
    }, 1500);
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

function getMOSDACResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('weather') || lowerMessage.includes('satellite')) {
        return 'MOSDAC provides comprehensive weather satellite data including INSAT-3D, INSAT-3DR, and other meteorological satellites. I can help you access real-time weather imagery, temperature profiles, and atmospheric data. What specific weather information are you looking for?';
    } else if (lowerMessage.includes('cyclone') || lowerMessage.includes('storm')) {
        return 'I can provide cyclone tracking data from our satellite monitoring systems. MOSDAC tracks tropical cyclones using multi-spectral imagery and provides real-time updates on storm intensity, path, and meteorological parameters. Would you like current cyclone status or historical data?';
    } else if (lowerMessage.includes('ocean') || lowerMessage.includes('sea')) {
        return 'MOSDAC offers extensive ocean data including sea surface temperature, chlorophyll concentration, and ocean color products from satellites like Oceansat-2 and INSAT series. I can help you analyze ocean currents, temperature anomalies, and marine ecosystem parameters.';
    } else if (lowerMessage.includes('rainfall') || lowerMessage.includes('monsoon')) {
        return 'Our rainfall estimation products use satellite data to provide quantitative precipitation estimates. I can help you access monsoon tracking data, rainfall distribution maps, and precipitation forecasts from our meteorological satellite constellation.';
    } else if (lowerMessage.includes('temperature') || lowerMessage.includes('climate')) {
        return 'MOSDAC provides temperature data products including atmospheric temperature profiles, land surface temperature, and sea surface temperature from various satellite sensors. I can help you analyze temperature trends, anomalies, and climate indicators.';
    } else if (lowerMessage.includes('data') || lowerMessage.includes('download')) {
        return 'MOSDAC offers various data products for download including Level-1, Level-2, and Level-3 products. You can access data through our web portal, FTP services, or API endpoints. I can guide you through the data access procedures and help you find the specific datasets you need.';
    } else if (lowerMessage.includes('insat') || lowerMessage.includes('satellite')) {
        return 'INSAT series satellites provide crucial meteorological data for weather monitoring and forecasting. INSAT-3D and INSAT-3DR offer high-resolution imagery and atmospheric sounding data. I can help you understand the different satellite products and their applications.';
    } else {
        return 'I\'m MOSDAC Assistant, specialized in meteorological and oceanographic satellite data. I can help you with weather analysis, cyclone tracking, ocean data, rainfall estimates, and climate monitoring. What would you like to explore from our satellite data archive?';
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
