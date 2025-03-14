let stompClient = null;
let userName = '';

// Conectar al servidor WebSocket
function connect() {
    const socket = new SockJS('http://localhost:8080/chat');
    stompClient = Stomp.over(socket);

    stompClient.debug = null;

    stompClient.connect({}, function (frame) {
        stompClient.subscribe('/topic/messages', function (message) {
            const messageData = JSON.parse(message.body);
            const msgElement = document.createElement('li');
            
            const currentTime = new Date();
            const hours = currentTime.getHours().toString().padStart(2, '0');
            const minutes = currentTime.getMinutes().toString().padStart(2, '0');
            const timeString = `${hours}:${minutes}`;

            const isCurrentUser = messageData.name === userName;
            msgElement.classList.add('message-item');
            msgElement.classList.add(isCurrentUser ? 'sent' : 'received');

            // Agregar el icono con la inicial
            const initialIcon = document.createElement('div');
            initialIcon.classList.add('initial-icon');
            initialIcon.textContent = messageData.name[0].toUpperCase();

            msgElement.innerHTML = 
                `<div class="message-header">
                    <span class="name">${messageData.name}</span>
                    <span class="time">${timeString}</span>
                </div>
                <div class="message-body">${messageData.message}</div>`;
            msgElement.prepend(initialIcon); 
            document.getElementById('messages').appendChild(msgElement);
            scrollToBottom();
            updateNoMessagesDisplay();
        });
    });
}

// Actualizar el nombre del usuario
function updateName() {
    userName = document.getElementById('name').value.trim();
    validateSendButton();
}

// Enviar un mensaje
function sendMessage() {
    const message = document.getElementById('message').value.trim();

    if (message && userName && stompClient) {
        stompClient.send("/app/sendMessage", {}, JSON.stringify({ 'name': userName, 'message': message }));
        document.getElementById('message').value = '';
        validateSendButton();
    } else {
        showModal('Por favor ingresa un nombre y un mensaje');
    }
}

// Manejar la tecla Enter
function handleEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Validar el botón de enviar
function validateSendButton() {
    const message = document.getElementById('message').value.trim();
    const sendButton = document.getElementById('send-button');
    sendButton.disabled = !userName || !message;
}

// Desplazar el chat hacia abajo
function scrollToBottom() {
    const chatBox = document.querySelector('.chat-box');
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Actualizar la visibilidad del mensaje "No hay mensajes"
function updateNoMessagesDisplay() {
    const messagesList = document.getElementById('messages');
    const noMessagesItem = document.querySelector('.no-messages');

    if (messagesList.children.length > 1) {
        noMessagesItem.style.display = 'none';
    } else {
        noMessagesItem.style.display = 'block';
    }
}

// Mostrar el modal de advertencia
function showModal(message) {
    const modal = document.getElementById('warning-modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = message;
    modal.style.display = 'block';
}

// Cerrar el modal
function closeModal() {
    const modal = document.getElementById('warning-modal');
    modal.style.display = 'none';
}

// Conectar al cargar la página
window.onload = connect;

// Limpiar inputs al recargar la página
window.onload = function () {
    connect();
    document.getElementById('name').value = '';
    document.getElementById('message').value = '';
    validateSendButton();
};