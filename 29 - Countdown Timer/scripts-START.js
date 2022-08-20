const displayTimer = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

let countdown;

function timer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds*1000
    displayEndTime(then);
    displayTimerLeft(seconds)
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now())/1000)
        if (secondsLeft < 0){
            clearInterval(countdown);
            return;
        }
        displayTimerLeft(secondsLeft);
    },1000);
}

function displayTimerLeft(seconds){
    const mins = Math.floor(seconds/60);
    const secs = seconds % 60;
    const timeLeft = secs < 10 ?`${mins}:0${secs}` : `${mins}:${secs}`;
    displayTimer.textContent = timeLeft;
    document.title = timeLeft;
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hours =end.getHours() > 12 ? end.getHours()-12 : end.getHours();
    const mins = end.getMinutes()
    // <10 ? `0${end.getMinutes()}`: end.getMinutes(); inserted code to es6 below
    endTime.textContent = `Be back at ${hours}:${mins < 10 ? `0${end.getMinutes()}`: end.getMinutes()}`;
}

function startTimer(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
};

buttons.forEach(button => button.addEventListener("click", startTimer))
document.customForm.addEventListener('submit', function(e){
    // stop from reloading the page and sending a get
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins*60);
    this.reset();
})