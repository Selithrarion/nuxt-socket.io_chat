require('dotenv').config();
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});
const cors = require('cors');
const Users = require('./users')();

app.use(cors());

io.on('connection', (socket) => {
	socket.on('userJoinRoom', (data, cb) => {
		socket.join(data.room);
		Users.remove(socket.id);
		Users.add({
			id: socket.id,
			name: data.name,
			room: data.room,
		});
		cb({ userID: socket.id });
		io.to(data.room).emit('updateUsers', Users.getByRoom(data.room));
		socket.emit('newMessage', {
			name: 'admin',
			text: 'Добро пожаловать в чат, ' + data.name,
		});
		socket.emit('newMessage', {
			name: 'Test',
			text: 'привет пупс',
			createdAt: Date.now(),
		});
		socket.broadcast.to(data.room).emit('newMessage', {
			name: 'admin',
			text: 'Пользователь ' + data.name + ' зашёл',
		});
		cb();
	});
	socket.on('createMessage', (data, cb) => {
		const user = Users.get(data.id);
		if (user) {
			io.to(user.room).emit('newMessage', {
				name: user.name,
				text: data.text,
				id: data.id,
				createdAt: Date.now(),
			});
		}
		cb();
	});

	socket.on('userLogout', (id, cb) => {
		const user = Users.remove(id);
		if (user) {
			io.to(user.room).emit('updateUsers', Users.getByRoom(user.room));
			io.to(user.room).emit('newMessage', {
				name: 'admin',
				text: 'Пользователь ' + user.name + ' вышел из чата',
			});
		}
		cb();
	});

	socket.on('disconnect', () => {
		const user = Users.remove(socket.id);
		if (user) {
			io.to(user.room).emit('updateUsers', Users.getByRoom(user.room));
			io.to(user.room).emit('newMessage', {
				name: 'admin',
				text: 'Пользователь ' + user.name + ' вышел из чата',
			});
		}
	});
});

http.listen(8080);
