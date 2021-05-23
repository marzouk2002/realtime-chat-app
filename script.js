const socket = io('http://localhost:3000')
const  messageContainer = document.querySelector('#send-container')
const  messageForm = document.querySelector('#send-container')
const  messageInput = document.querySelector('#message-input')

socket.on('chat-message', data => {
    appendMessage(data)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    socket.emit('send-message', message)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement  = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}