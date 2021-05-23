const socket = io('http://localhost:3000')
const  messageContainer = document.querySelector('#message-container')
const  messageForm = document.querySelector('#send-container')
const  messageInput = document.querySelector('#message-input')

const name = prompt("What is your name?")
appendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(`${data.name} ${data.message}`)
})

socket.on('user-connected', data => {
    appendMessage(`${data} connected`)
})

socket.on('user-disconnected', data => {
    appendMessage(`${data} disconnected`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You ${message}`)
    socket.emit('send-message', message)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement  = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}