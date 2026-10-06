import express from 'express'
import dotenv from 'dotenv'
import {WebSocketServer} from 'ws'

dotenv.config()
const PORT = process.env.PORT

// const app = express()
const wss = new WebSocketServer({
	port: PORT,
	host: "0.0.0.0"
})

let rooms = {}

wss.on("connection", (socket) => {
	console.log("New Client added")

	socket.on("message", (data) => {
		const message = JSON.parse(data)
		if(message.type === "create") {
			const roomId = String(Math.floor(100000 + Math.random() * 900000))
			rooms[roomId] = {
				devices: new Set([socket])
			}
			socket.roomId = roomId
			socket.send(JSON.stringify({
				type: "roomId",
				roomId: roomId
			}))
		}

		else if(message.type === "join") {
			const roomId = message.roomId
			if(!rooms[roomId]) {
				socket.send(JSON.stringify({
					type: "join",
					msg: `No Room with id: ${roomId}`
				}))
			} else {
				if(rooms[roomId].devices.size >= 2){
					socket.send(JSON.stringify({
						type: "join",
						msg: `Room ${roomId} is already full`
					}))
				} else {
					rooms[roomId].devices.add(socket)
					socket.roomId = roomId

					// tell the others that a someone joined the room
					for (const peer of rooms[roomId].devices) {
						if(peer !== socket) {
							peer.send(JSON.stringify({
								type: "new-connection",
								msg: "New device is connected\nStart transferring the message"
							}))
						}
					}
				}
			}
		}

		else {
			// offer, answer and candidate messages
			const roomId = socket.roomId
			for (const peer of rooms[roomId].devices){
				if(peer !== socket) {
					peer.send(JSON.stringify(message))
				}
			}
		}

	})

	socket.on('close', () => {
		const roomId = socket.roomId
		console.log(`Peer left from room ${roomId}`)
		
		if(!roomId || !rooms[roomId]) {
			console.log("There is no such room")
			return
		}

		const curRoom = rooms[roomId]
		curRoom.devices.delete(socket)

		for(const peer of curRoom.devices) {
			peer.send(JSON.stringify({
				type: "peer-left"
			}))
		}

		if(curRoom.devices.size === 0) {
			delete rooms[roomId]
		}
	})
})

// app.listen(PORT, (err) => {
// 	if(err) {
// 		console.log(err)
// 	} else {
// 		console.log(`Server is running on port: ${PORT}`)
// 	}
// })