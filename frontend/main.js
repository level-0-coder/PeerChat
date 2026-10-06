let localStream
let remoteStream
let peerConnection

const log = document.getElementById("log")

const BACKEND_URL = "ws://10.173.15.68:3000"

const ws = new WebSocket(BACKEND_URL)

function print(message) {
	console.log(message)
	log.textContent += message + '\n'
}

ws.onopen = () => {
	console.log("Connected to Web Socket server")
}

ws.onmessage = async (event) => {
	const message = JSON.parse(event.data)
	if(message.type === "roomId") {
		document.getElementById("roomId").textContent = message.roomId
	}
	else if(message.type === "new-connection") {
		const offer = await createOffer()
		ws.send(JSON.stringify(offer))
	}
	else if(message.type === "join") {
		print(`Joining Error: ${message.msg}`)
	}
	else if(message.type === "offer") {
		const offer = message
		const answer = await createAnswer(offer)
		ws.send(JSON.stringify(answer))
	}
	else if(message.type === "answer") {
		const answer = message
		await peerConnection.setRemoteDescription(answer)
		print("Remote Description Set")
	}
	else if(message.type === "candidate") {
		print("Received candidate: ", message.candidate)
		print("Peer connection: ", peerConnection)
		await peerConnection.addIceCandidate(message.candidate)
	}
}

ws.onerror = (error) => {
	print("WebSocket Error:" + error)
}

ws.onclose = () => {
	print("Disconnected")
}

const servers = {
	iceServers: [
		{
			urls: ['stun:stun2.l.google.com:19302', 'stun:stun1.l.google.com:19302']
		}
	]
}

let init = async () => {
	localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: false})
	document.getElementById('user-1').srcObject = localStream

	const connectBtn = document.getElementById("connect")
	connectBtn.onclick = async () => {
		const roomId = document.getElementById("roomCode").value
		if(!roomId) {
			print("Enter room code")
			return
		}
		else if(roomId.length !== 6) {
			print("Room code is of wrong length")
			return
		}

		ws.send(JSON.stringify({
			type: "join",
			roomId: roomId
		}))
	}

	const createBtn = document.getElementById("create")
	createBtn.onclick = async () => {
		print("sending create request")
		ws.send(JSON.stringify({
			type: "create"
		}))
	}

	// createOffer()
}

// from device A
let createOffer = async () => {
	peerConnection = new RTCPeerConnection(servers)

	remoteStream = new MediaStream()
	document.getElementById('user-2').srcObject = remoteStream

	localStream.getTracks().forEach((track) => {
		peerConnection.addTrack(track, localStream)
	})

	peerConnection.ontrack = (event) => {
		event.streams[0].getTracks().forEach((track) => {
			remoteStream.addTrack(track)
		})
	}

	peerConnection.onicecandidate = async (event) => {
		if(event.candidate) {
			print("New ICE candidate: ", event.candidate)
			ws.send(JSON.stringify({
				type: "candidate",
				candidate: event.candidate
			}))
		}
	}

	let offer = await peerConnection.createOffer()
	await peerConnection.setLocalDescription(offer)
	print("Local Description Set")

	return offer
}

// from device B
let createAnswer = async (offer) => {
	peerConnection = new RTCPeerConnection(servers)

	remoteStream = new MediaStream()
	document.getElementById('user-2').srcObject = remoteStream

	localStream.getTracks().forEach((track) => {
		peerConnection.addTrack(track, localStream)
	})

	peerConnection.ontrack = (event) => {
		event.streams[0].getTracks().forEach((track) => {
			remoteStream.addTrack(track)
		})
	}

	peerConnection.onicecandidate = async (event) => {
		if(event.candidate) {
			print("New ICE candidate: ", event.candidate)
			ws.send(JSON.stringify({
				type: "candidate",
				candidate: event.candidate
			}))
		}
	}

	await peerConnection.setRemoteDescription(offer)

	const answer = await peerConnection.createAnswer()
	await peerConnection.setLocalDescription(answer)

	return answer
}
init()
