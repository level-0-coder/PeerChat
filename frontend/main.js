let localStream
let remoteStream
let peerConnection

const BACKEND_URL = "ws://172.16.120.106:3000"

const ws = new WebSocket(BACKEND_URL)

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
		console.log(`Joining Error: ${message.msg}`)
	}
	else if(message.type === "offer") {
		const offer = message
		const answer = await createAnswer(offer)
		ws.send(JSON.stringify(answer))
	}
	else if(message.type === "answer") {
		const answer = message
		await peerConnection.setRemoteDescription(answer)
		console.log("Remote Description Set")
	}
	else if(message.type === "candidate") {
		console.log("Received candidate: ", message.candidate)
		console.log("Peer connection: ", peerConnection)
		await peerConnection.addIceCandidate(message.candidate)
	}
}

ws.onerror = (error) => {
	console.log("WebSocket Error:" + error)
}

ws.onclose = () => {
	console.log("Disconnected")
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
			console.log("Enter room code")
			return
		}
		else if(roomId.length !== 6) {
			console.log("Room code is of wrong length")
			return
		}

		ws.send(JSON.stringify({
			type: "join",
			roomId: roomId
		}))
	}

	const createBtn = document.getElementById("create")
	createBtn.onclick = async () => {
		console.log("sending create request")
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
			console.log("New ICE candidate: ", event.candidate)
			ws.send(JSON.stringify({
				type: "candidate",
				candidate: event.candidate
			}))
		}
	}

	let offer = await peerConnection.createOffer()
	await peerConnection.setLocalDescription(offer)
	console.log("Local Description Set")

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
			console.log("New ICE candidate: ", event.candidate)
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
