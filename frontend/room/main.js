const params = new URLSearchParams(window.location.search)

let localStream
let remoteStream
let peerConnection
let negotiated = false
let roomId = params.get('id')

const video1 = document.getElementById('user-1')
const video2 = document.getElementById('user-2')

const log = document.getElementById("log")
const notification = document.getElementById("notification")
const notificationText = document.getElementById("notification-text")
const closeNotification = document.getElementById("close-notification")

const endBtn = document.getElementById('end-btn')

const videoBtn = document.getElementById('video-btn')
const videoIcon = videoBtn.querySelector('span')

const micBtn = document.getElementById('mic-btn')
const micIcon = micBtn.querySelector('span')

const BACKEND_URL = "wss://peer-chat-backend.vercel.app"

const ws = new WebSocket(BACKEND_URL)

function print(...messages) {
	console.log(...messages)
	log.textContent += messages.join(' ') + '\n'
}

let notificationOpen = false

closeNotification.addEventListener('click', (event) => {
	if(notificationOpen){
		notification.classList.remove('active')		
		notificationOpen = false
	}
})

const NOTIFICATION_COLOR = {
	'RED': 'notify-color-red',
	'GREEN': 'notify-color-green',
	'ORANGE': 'notify-color-orange',
	'DEFAULT': 'notify-color-default' // white
}

function notify(COLOR,...messages) {
	notification.classList.add(NOTIFICATION_COLOR[COLOR])
	if(!notificationOpen){
		notificationOpen = true
		notificationText.textContent = messages.join(' ')

		notification.classList.add('active')
		setTimeout(() => {
			notification.classList.remove('active')

			// notification.addEventListener('transitionend', function handler() {
			// 	notificationText.textContent = ''
			// 	notification.removeEventListener('transitionend', handler)
			// })
		}, 5000)
	} else {
		notificationText.textContent = messages.join(' ')
	}
}

ws.onopen = () => {
	console.log("Connected to Web Socket server")

	if(roomId) {
		document.getElementById("roomId").textContent = roomId.slice(0, 3) + " " + roomId.slice(3)
		document.getElementById("header-right").style.display = 'flex'

		ws.send(JSON.stringify({
			type: "join",
			roomId: roomId
		}))
	} else {
		ws.send(JSON.stringify({
			type: 'create'
		}))
	}
}

ws.onmessage = async (event) => {
	const message = JSON.parse(event.data)
	if(message.type === "roomId") {
		roomId = message.roomId
		document.getElementById("roomId").textContent = roomId.slice(0, 3) + " " + roomId.slice(3)
		document.getElementById("header-right").style.display = 'flex'

		history.replaceState(null, '', `/room?id=${roomId}`)
	}
	else if(message.type === "new-connection") {
		const offer = await createOffer()
		ws.send(JSON.stringify(offer))
	}
	else if(message.type === "join") {
		print(`Joining Error: ${message.msg}`)
		notify('RED', 'Room doesn\'t exist. Redirecting shortly...')
		setTimeout(() => {
			window.location.replace('/')
		}, 5000)
	}
	else if(message.type === "offer") {
		// document.getElementById("roomId").textContent = roomId
		const offer = message
		const answer = await createAnswer(offer)
		ws.send(JSON.stringify(answer))
	}
	else if(message.type === "answer") {
		const answer = message
		await peerConnection.setRemoteDescription(answer)
		negotiated = true
		print("Remote Description Set")
	}
	else if(message.type === "candidate") {

		notify('DEFAULT', 'Peer has entered the room')

		video1.classList.add('pip-player')
		// video1.style.aspectRatio = `${video1.videoWidth} / ${video1.videoHeight}`


		print("Received candidate: ", message.candidate)
		print("Peer connection: ", peerConnection)
		await peerConnection.addIceCandidate(message.candidate)
	}
	else if(message.type === "peer-left") {
		print("Peer left from the room")

		notify('GREEN', 'Peer left the room')
		
		// video1.style.transition = 'all 3s ease'
		video1.classList.add('pip-exiting')

		video2.style.display = 'none'

		video1.addEventListener('transitionend',function handler(event) {

			video1.classList.remove('pip-player', 'pip-exiting')

			video1.removeEventListener('transitionend', handler)
		})

		peerConnection?.close()
		peerConnection = null
		negotiated = false
	}
}

ws.onerror = (error) => {
	print("WebSocket Error:" + error)
}

ws.onclose = () => {
	print("Disconnected")
	notify('RED', 'Disconnected from the room\nRedirecting shortly...')
	setTimeout(() => {
		window.location.replace('/')
	}, 5000)
}

video2.addEventListener('loadedmetadata', (event) => {
	video2.style.display = 'block'
})

const servers = {
	iceServers: [
		{
			urls: ['stun:stun2.l.google.com:19302', 'stun:stun1.l.google.com:19302']
		}
	]
}

let init = async () => {
	const params = new URLSearchParams(window.location.search)
	roomId = params.get('id')
	if(roomId) {
		if(roomId.length !== 6) {
			print("Room code is of wrong length")
			window.location.href = "/"
			return
		}

		// ws.send(JSON.stringify({
		// 	type: "join",
		// 	roomId: roomId
		// }))
	}

	// video1.addEventListener('loadedmetadata', (event) => {
	// 	video1.width = video1.videoWidth
	// 	video1.height = video1.videoHeight
	// 	print(video1.videoWidth + '\t' + video1.videoWidth)
	// })
	
	try {
		localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: false})
		video1.srcObject = localStream
		videoIcon.textContent = 'videocam'
	} catch (error) {
		print("could not access camera:", error.message)
		localStream = new MediaStream()
		video1.srcObject = localStream
	}

	const connectBtn = document.getElementById("connect")
	connectBtn.onclick = async () => {
		roomId = document.getElementById("roomCode").value
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
	video2.srcObject = remoteStream

	if(localStream) {
		localStream.getTracks().forEach((track) => {
			peerConnection.addTrack(track, localStream)
		})
	}

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

	peerConnection.onnegotiationneeded = async (event) => {
		if(!negotiated) return
		try {
			const offer = await peerConnection.createOffer()
			await peerConnection.setLocalDescription(offer)
			ws.send(JSON.stringify({
				peerConnection.localDescription
			}))
		} catch (error) {
			print('Renegotiation failed:', error)
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
	video2.srcObject = remoteStream

	if(localStream) {
		localStream.getTracks().forEach((track) => {
			peerConnection.addTrack(track, localStream)
		})
	}

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

	peerConnection.onnegotiationneeded = async (event) => {
		if(!negotiated) return
		try {
			const offer = await peerConnection.createOffer()
			await peerConnection.setLocalDescription(offer)
			ws.send(JSON.stringify(pc.localDescription))
		} catch (error) {
			print('Renegotiation failed:', error)
		}
	}

	await peerConnection.setRemoteDescription(offer)

	const answer = await peerConnection.createAnswer()
	await peerConnection.setLocalDescription(answer)

	return answer
}
init()


// SOME DISPLAY RELATED scripts
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
let copied = false

document.getElementById('header-right').addEventListener('click', async (event) => {
	if(!copied) {
		copied = true
		const copyIcon = document.getElementById('copy-icon')
	
		try {
			await navigator.clipboard.writeText(roomId)
			
			copyIcon.classList.add('fade-out')
			await sleep(200)

			copyIcon.textContent = 'done_all'
			copyIcon.classList.remove('fade-out')
			await sleep(1200)

			copyIcon.classList.add('fade-out')
			await sleep(200)
			copyIcon.textContent = 'content_copy'
			copyIcon.classList.remove('fade-out')
			await sleep(200)
		} catch (error) {
			console.error('Failed to copy room ID', error)
		} finally {
			copied = false
		}
	}
})


let isDragging = false
let offsetX = 0
let offsetY = 0

let grabable = () => {

}

video1.addEventListener('pointerdown', (event) => {
	if(!video1.classList.contains('pip-player')) return
	isDragging = true

	const rect = video1.getBoundingClientRect()

	offsetX = event.clientX - rect.left;
	offsetY = event.clientY - rect.top;

	video1.setPointerCapture(event.pointerId)
	video1.style.transition = 'none'
})

video1.addEventListener('pointermove', (event) => {
	if(!isDragging) {
		return
	}

	const x = event.clientX - offsetX
	const y = event.clientY - offsetY

	const maxX = window.innerWidth - video1.offsetWidth
	const maxY = window.innerHeight - video1.offsetHeight

	const minY = 72
	// console.log(event.clientX, "\t", event.clientY)
	
	video1.style.left = `${Math.max(0, Math.min(x, maxX))}px`
	video1.style.top = `${Math.max(72, Math.min(y, maxY))}px`
})

video1.addEventListener('pointerup', (event) => {
	isDragging = false
	video1.style.transition = 'all 0.2s ease'
})

video1.addEventListener('pointercancel', (event) => {
	isDragging = false
	video1.style.transition = 'all 0.2s ease'
})

endBtn.addEventListener('click', (event) => {
	window.location.replace('/')
})

videoBtn.addEventListener('click', async (event) => {
	try{
		const videoTrack = localStream.getVideoTracks()[0]

		if(videoTrack) {
			videoTrack.enabled = !videoTrack.enabled
			videoIcon.textContent = videoTrack.enabled ? 'videocam' : 'videocam_off'
		}
		else {
			const videoStream = await navigator.mediaDevices.getUserMedia({video: true})
			const newVideoTrack = videoStream.getVideoTracks()[0]
			localStream.addTrack(newVideoTrack)
			videoIcon.textContent = 'videocam'

			if(peerConnection) {
				peerConnection.addTrack(newVideoTrack, localStream)

				// const offer = await createOffer()
				// ws.send(JSON.stringify(offer))
			}
		}
	} catch (error) {
		console.error('Could not enable camera:', error)
	}
})

micBtn.addEventListener('click', async (event) => {
	try{
		const audioTrack = localStream.getAudioTracks()[0]

		if(audioTrack) {
			audioTrack.enabled = !audioTrack.enabled
			micIcon.textContent = audioTrack.enabled ? 'mic' : 'mic_off'
		}
		else {
			const audioStream = await navigator.mediaDevices.getUserMedia({audio: true})
			const newAudioTrack = audioStream.getAudioTracks()[0]
			localStream.addTrack(newAudioTrack)
			micIcon.textContent = 'mic'

			if(peerConnection) {
				peerConnection.addTrack(newAudioTrack, localStream)

				// const offer = await createOffer()
				// ws.send(JSON.stringify(offer))
			}

		}
	} catch (error) {
		console.error('Could not enable microphone:', error)
	}
})


// createOffer() creates new RTCPeerConnection along with the required offer is created
// peerConnection.createOffer() is built-in method which creates offer for the existing RTCPeerConnection