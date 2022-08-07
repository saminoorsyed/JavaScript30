const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle');
const skipButts = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const progressBar = player.querySelector('.progress__filled');
const progress = player.querySelector('.progress');

let rangeDrag = false;
let progressDrag = false;

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

function handleSlider(){
    if (!rangeDrag) return
    video[this.name] = this.value;
    // don't do it this way -->
    // if (this.name === 'volume'){

    // }
    // if (this.name === 'playbackRate'){

    // }
}

function handleProgress(){
    const percent = (video.currentTime/video.duration) *100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime
    
}


video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => progressDrag && scrub(e));
progress.addEventListener('mousedown', () => progressDrag = true);
progress.addEventListener('mouseup', () => progressDrag = false);


skipButts.forEach(button => button.addEventListener('click',skipper));
ranges.forEach(slider => slider.addEventListener('change', handleSlider));
ranges.forEach(slider => slider.addEventListener('mousemove', handleSlider));
ranges.forEach(slider => slider.addEventListener('mousedown',() => rangeDrag = true));
ranges.forEach(slider => slider.addEventListener('mouseup',() => rangeDrag = false));
ranges.forEach(slider => slider.addEventListener('mouseout',() => rangeDrag = false));
