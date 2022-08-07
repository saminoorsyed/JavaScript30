const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle');
const skipButts = player.querySelectorAll('[data-skip]')

function togglePlay(){
    video[video.paused ? 'play' : 'pause']();
    
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skipper(){
    // console.log(this.dataset) <- gives every "data-"" attribute's value
    video.currentTime += parseFloat(this.dataset.skip)
}
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
skipButts.forEach(button => button.addEventListener('click',skipper));