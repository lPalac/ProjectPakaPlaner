const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')

const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const pollContainer = document.getElementById('meme');



if (messageForm != null) {
  const name = prompt('What is your name?')
  appendMessage('You joined')
  socket.emit('new-user', roomName, name)

  messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', roomName, message)
    messageInput.value = ''
  })
}



const button = document.getElementById("submitBtn");



button.addEventListener('click',e=>{
  const pollName = document.getElementById("poll").value;
  socket.emit('new-poll',roomName,pollName);
  appendPoll(`${pollName}`);
  pollName.value = '';
  

});

socket.on('poll',(data) =>{
  console.log("yo")
  appendPoll(`${data}`);
})

socket.on('room-created', room => {
  
  roomLink.href = `/${room}`
  roomLink.innerText = 'join'
})

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

function appendPoll(poll) {
  const pollElement = document.createElement('div');
  pollElement.innerText = poll;
  pollContainer.append(pollElement);
  console.log("meme");
}


function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
  
}

function randomIDGenerator(){
  var number = Math.random() // 0.9394456857981651
  number.toString(36); // '0.xtis06h6'
  var id = number.toString(36).substr(2, 9); // 'xtis06h6'
  id.length >= 9; // false
  return id;
}