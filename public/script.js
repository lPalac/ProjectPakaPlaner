const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')

const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const pollContainer = document.getElementById('meme');
var i = 0;



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
  appendPoll(`${data}`);
})

socket.on('vote-button-pressed',button=>{
  const pollArray = document.getElementsByClassName("pollName");
 
  for(var i = 0;i<pollArray.length;i++)
  {
    if(pollArray[i].firstElementChild.innerText == button)
      pollArray[i].getElementsByTagName("div")[1].className += 20;
  }

});


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
  pollElement.className = "pollName"
  pollElement.innerHTML = ` 
  <a>${poll}</a>
  <button class = "chat__button">Vote</button>
    <div class="selection__bar">
     <div class="selection__bar-progress">
    </div>
  </div>`
  pollContainer.append(pollElement);
  const voteButton = document.getElementsByClassName("chat__button");

 
    for (let i = 0; i < voteButton.length; i++) {
      const button = voteButton[i];
      if(button.flag != true)
        button.addEventListener('click', HandleVoteButtonClick)
    
      voteButton[i].flag = true;
    }

}



function HandleClientSideVote(button)
{
  const pollArray = document.getElementsByClassName("pollName");
 
  for(var i = 0;i<pollArray.length;i++)
  {
    if(pollArray[i].firstElementChild.innerText == button)
      pollArray[i].getElementsByTagName("div")[1].className += 20;
  }
}


function HandleVoteButtonClick(e)
{
  //server handle
  
  socket.emit("vote-button-press",roomName,e.path[1].firstElementChild.innerText)

  e.path[0].disabled = true;
  e.path[0].style.background = "gray";

  HandleClientSideVote(e.path[1].firstElementChild.innerText);
  //MAKE CLIENT SIDE WORK
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