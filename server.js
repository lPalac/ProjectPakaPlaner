const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
let validator = require('validator')

let RoomScheme = require('./models/room')

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

const rooms = { }



//Mongo Connection
const MongoURI = 'mongodb+srv://david:david@pakaplanner-k5xvn.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(
  MongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => console.log('mongo connected'))
.catch((err) => console.log('error ' + err))

//--------------------

app.use(express.static(__dirname+ '/public'));

app.get('/', (req, res) => {
  res.render('index', { rooms: rooms })
})


//Room Creation - uploaded to Mongo

app.post('/room', (req, res) => {
  if (rooms[req.body.room] != null) {
    return res.redirect('/')
  }
  let roomName = req.body.room

  let newRoom = new RoomScheme({
    RoomID: randomIDGenerator(),
    roomName      
  })
  newRoom.save().then(() => {
    res.redirect(req.body.room)
  }).catch(err => {
    res.status(400).send({ error: err})
  })
  
 
  rooms[req.body.room] = { users: { } }
  // Send message that new room was created
  io.emit('room-created', req.body.room)
})

//--------------------------

app.get('/:room', (req, res) => {

  if (rooms[req.params.room] == null) {
    return res.redirect('/')
  }
  res.render('room', { roomName: req.params.room })
})

server.listen(3000)

io.on('connection', socket => {
  socket.on('new-user', (room, name) => {
    socket.join(room)
    rooms[room].users[socket.id] = name


//USER ADDING TO MONGO

// ---------MAYBE DOESN'T WORK AND/OR USELESS----------------------
// var objUser = {user: "David"};
// db.findOneAndUpdate(
//   { roomName: room }, 
//   { $push: { user: objUser  } },
//  function (error, success) {
//        if (error) {
//            console.log(error);
//        } else {
//            console.log(success);
//        }
//    });

// -----------------

  socket.to(room).broadcast.emit('user-connected', name)
    
  })
  socket.on('send-chat-message', (room, message) => {
    socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.id] })
  })
  socket.on('disconnect', () => {
    getUserRooms(socket).forEach(room => {
      socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id])
      delete rooms[room].users[socket.id]
    })
  })
})

function getUserRooms(socket) {
  return Object.entries(rooms).reduce((names, [name, room]) => {
    if (room.users[socket.id] != null) names.push(name)
    return names
  }, [])
}

//duhh
function randomIDGenerator(){
  var number = Math.random() // 0.9394456857981651
  number.toString(36); // '0.xtis06h6'
  var id = number.toString(36).substr(2, 9); // 'xtis06h6'
  id.length >= 9; // false
  return id;
}