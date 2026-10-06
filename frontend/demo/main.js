let pc
let channel

const local = document.getElementById("local")
const remote = document.getElementById("remote")
const log = document.getElementById("log")


function print(message) {
	log.textContent += message + '\n'
}

function createPeerConnection() {
	pc = new RTCPeerConnection({
		iceServers: [
			{
				urls: ['stun:stun2.l.google.com:19302', 'stun:stun1.l.google.com:19302']
			}
		]
	})

	pc.onicecandidate = (event) => {
		if(event.candidate === null) {
			local.value = JSON.stringify(pc.localDescription)
		}
	}

	pc.onconnectionstatechange = (event) => {
		print("Connection: " + event.connectionState)
	}

}

document.getElementById("createOffer").onclick = async () => {

	createPeerConnection()

	channel = pc.createDataChannel("data")

	channel.onopen = () => {
		print("Data channel open")
	}

	channel.onmessage = (event) => {
		print("Received: " + event.data)
	}

	const offer = await pc.createOffer()

	await pc.setLocalDescription(offer)

	print("waiting for ICE candidates...")
}

document.getElementById("createAnswer").onclick = async () => {
	// sets local settings
	createPeerConnection()
	
	pc.ondatachannel = (event) => {
		channel = event.channel

		channel.onopen = () => {
			print("Data channel OPEN")
		}

		channel.onmessage = (event) => {
			print("Received: " + event.data)
		}
	}

	const offer = JSON.parse(remote.value)

	await pc.setRemoteDescription(offer)

	const answer = await pc.createAnswer()

	await pc.setLocalDescription(answer)

	print("waiting for ICE candidates...")
}

document.getElementById("connect").onclick = async () => {
	const answer = JSON.parse(remote.value)

	await pc.setRemoteDescription(answer)

	print("Remote Description Set")
}

document.getElementById("send").onclick = async () => {
	if(!channel || channel.readyState !== "open") {
		print("Data Channel isn't open")
		return
	}

	const message = document.getElementById("message").value

	channel.send(message)

	print("sent: " + message)
}
