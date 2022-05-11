const musicWrapper = document.querySelector('.music-wrapper')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#previous')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressWrapper = document.querySelector('.progress-wrapper')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

// Titles
const songs = musicWrapper.dataset.songs.split(',')
const musicDir = musicWrapper.dataset.music_dir
const imageDir = musicWrapper.dataset.image_dir


// Track songs
let songIndex = 0

// Load song info to DOM
loadSong(songs[songIndex])

// Update info
function loadSong(song) {
	title.innerText = song
	audio.src = `${musicDir}/${song}.mp3`
	cover.src = `${imageDir}/${song}.jpg`
}

// Play/Pause functons
function playSong() {
	musicWrapper.classList.add('play')
	playBtn.querySelector('i.fas').classList.remove('fa-play')
	playBtn.querySelector('i.fas').classList.add('fa-pause')

	audio.play()
}

function pauseSong() {
	musicWrapper.classList.remove('play')
	playBtn.querySelector('i.fas').classList.add('fa-play')
	playBtn.querySelector('i.fas').classList.remove('fa-pause')

	audio.pause()
}

// Event listeners
playBtn.addEventListener('click', () => {
	const isPlaying = musicWrapper.classList.contains('play')
	if (isPlaying) {
		pauseSong()
	} else {
		playSong()
	}
})

prevBtn.addEventListener('click', () => {
	const isPlaying = musicWrapper.classList.contains('play')
	songIndex--
	if (songIndex < 0) {
		songIndex = songs.length - 1
	}
	loadSong(songs[songIndex])
	if (isPlaying) {
		audio.play()
	} else {
		audio.pause()
	}
})

nextBtn.addEventListener('click', () => {
	const isPlaying = musicWrapper.classList.contains('play')
	songIndex++
	if (songIndex > songs.length - 1) {
		songIndex = 0
	}
	loadSong(songs[songIndex])
	if (isPlaying) {
		audio.play()
	} else {
		audio.pause()
	}
})

audio.addEventListener('timeupdate', (e) => {
	const { duration, currentTime } = e.target
	let progressPercent = (currentTime / duration) * 100
	progress.style.width = `${progressPercent}%`
})

audio.addEventListener('ended', () => {
	audio.currentTime = 0
	pauseSong()
})

// This occurs when a media key is used
audio.addEventListener('pause', () => {pauseSong()})
audio.addEventListener('play', () => {playSong()})

progressWrapper.addEventListener('click', (e) => {
	const width = progressWrapper.clientWidth
	const clickX = e.offsetX
	const duration = audio.duration
	
	audio.currentTime = (clickX / width) * duration
})

function lerp(v1, v2, alpha) {
	return (1 - alpha) * v1 + alpha * v2;
}

function draw(data){
    data = [...data];
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let space = canvas.width / data.length;
    data.forEach((value,i)=>{
        ctx.beginPath();
        ctx.moveTo(space*i,canvas.height); //x,y
        ctx.lineTo(space*i,canvas.height-value); //x,y
		red = lerp(81, 113, value/(canvas.height/2))
		green = lerp(40, 49, value/(canvas.height/2))
		blue = lerp(57, 65, value/(canvas.height/2))
		ctx.strokeStyle = `rgba(${red},${green},${blue}, 0.7)`;
        ctx.stroke();
    })
}
function loopingFunction(){
	requestAnimationFrame(loopingFunction);
	analyser.getByteFrequencyData(data);
	draw(data);
}

// Audio Vis
let canvas = document.getElementById('audio_visual')
let ctx = canvas.getContext("2d");
let audioCtx = new AudioContext();
let analyser = audioCtx.createAnalyser();
analyser.fftSize = 1024;
let source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
source.connect(audioCtx.destination);

let data = new Uint8Array(analyser.frequencyBinCount);
requestAnimationFrame(loopingFunction);

audio.onplay = ()=>{
    audioCtx.resume();
}
