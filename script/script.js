
const playPauseBtn = document.querySelector('.playBtn')
const volumeBtn = document.querySelector('.volume-btn')
const fulllScreenIcon = document.querySelector('.fullscreen-icon')
const video = document.getElementById('video')
const videoContainer = document.querySelector('.video-container')
const pipMode = document.querySelector('.pip')
const videoProgressBar = document.querySelector('.video-progress')
const volumeProgressBar = document.querySelector('.volume-progress')
const videoTimeDisplay = document.querySelector('.video-time-display')
const forwardIconsDiv = document.querySelector('.forward-icons-div')
const videoControls = document.querySelector('.controls')
const videoTitleName = document.querySelector('.video-title-name')


// =========================================
//            event listener
// =========================================

playPauseBtn.addEventListener('click', playPauseVideo)

volumeBtn.addEventListener('click', volumePlayPause)

fulllScreenIcon.addEventListener('click', viewInFullScreen)

pipMode.addEventListener('click', togglePipMode)

video.addEventListener('timeupdate',progressUpdate)

volumeProgressBar.addEventListener('change', volumeControl)

forwardIconsDiv.addEventListener('click', forwardFunction)



// =========================================
//           Defaults reset
// =========================================
document.addEventListener('DOMContentLoaded', () => {

    video.pause()

    volumeProgressBar.defaultValue = 20

    videoProgressBar.defaultValue = 0

    videoProgressBar.style.background = 'white'

    volumeProgressBar.style.backgroundImage = `linear-gradient(90deg , red 0%, red 20% , #d3d3d3 20%, #d3d3d3 100% )`

    video.volume = 0.2
})


// auto contros hide and show function
let timeout ;
document.addEventListener('mousemove', () => {
  videoControls.style.opacity = 1
  videoTitleName.style.opacity = 1

  clearTimeout(timeout)
  timeout = setTimeout( () => { 
    videoControls.style.opacity = 0
    videoTitleName.style.opacity = 0
  }, 2000);
})


videoContainer.addEventListener('dblclick', viewInFullScreen);

// =========================================
//           // functions
// =========================================

 
// function to play and pause
function playPauseVideo() {
  if(video.paused) {
    video.play()
    playPauseBtn.classList.replace('fa-circle-play','fa-circle-pause')
  }
  else if(video.play) {
    video.pause()
    playPauseBtn.classList.replace('fa-circle-pause', 'fa-circle-play' )
  }
}

// play pause while clicking on video itself function
videoContainer.addEventListener('click', (e) => {
  if(e.target.classList.contains('video')) {
    playPauseVideo()
  }
})


function volumePlayPause() {
    // vido volume setting
    video.muted = !video.muted

    // volume btn setting
    volumeBtn.classList.contains('fa-volume-high') ? volumeBtn.classList.replace('fa-volume-high', 'fa-volume-xmark') : volumeBtn.classList.replace('fa-volume-xmark', 'fa-volume-high')
  

}


// full screen icon
function viewInFullScreen() {
    // adding full screen to container
    videoContainer.classList.toggle('full-screen')
     
    // adding full screen to browser with brwoser-web-api
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen();
        fulllScreenIcon.classList.replace('fa-expand','fa-compress')
      } else {
        document.exitFullscreen();
        fulllScreenIcon.classList.replace('fa-compress','fa-expand')
      }
}

// pip mode
function togglePipMode() {
    if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled) {
        video.requestPictureInPicture();
      }
}

// video progress bar update with Time
function progressUpdate(){
  videoProgressBar.style.backgroundImage = `linear-gradient(90deg , red 0%, red ${(video.currentTime/video.duration)*100}% ,#d3d3d3 ${(video.currentTime/video.duration)*100}%, #d3d3d3 100% )`
  videoProgressBar.value = `${(video.currentTime/video.duration)*100}`
  
  //update Time
  videoTimeDisplayUpdate()
}


// video volume controls
function volumeControl(e) {
  volumeProgressBar.style.backgroundImage = `linear-gradient(90deg , red 0%, red ${volumeProgressBar.value}% , #d3d3d3 ${volumeProgressBar.value}%, #d3d3d3 100% )`
  video.volume = volumeProgressBar.value/100
}


// video progress bar update by user
function videoProgress(){           
           video.currentTime = `${Math.floor((videoProgressBar.value/100)*video.duration)}`
}

// ForWard and back-forward feature
function forwardFunction(e) {
 if (e.target.classList.contains('forward-plus')) { 
  video.currentTime = `${Math.floor(((videoProgressBar.value ) /100)*video.duration) + 10}`  
}
 if (e.target.classList.contains('forward-minus')) { 
  video.currentTime = `${Math.floor(((videoProgressBar.value )/100)*video.duration) - 10}` 
}
}

// video Display Time update
function videoTimeDisplayUpdate() {

  let vidCurrentMinutes = `${Math.floor(video.currentTime / 60)}`
  let vidCurrentSeconds = `${Math.floor(video.currentTime % 60)}`
  let vidTotalMinutes = `${Math.floor(video.duration/60)}`
  let vidTotalSeconds = `${Math.floor(video.duration % 60)}`
  
  videoTimeDisplay.innerHTML = ` ${vidCurrentMinutes.padStart(2,'0')}:${vidCurrentSeconds.padStart(2,'0')} / ${vidTotalMinutes.padStart(2,'0')}:${vidTotalSeconds.padStart(2,'0')} `
  
}



 // logo link
 const myLogo = document.querySelector('.logo-img')
 myLogo.addEventListener('click',()=> {
     window.open("https://ashish-nagar.netlify.app/", '_blank');
 })
 