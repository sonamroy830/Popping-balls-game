let BALLS_ON_SCREEN = 0;
let POPPED_BALLS = 0;

let remainingBallsEl = document.getElementById('remaining');
let poppedBallsEl = document.getElementById('popped');
const msgEl = document.getElementById('message');
const gameEl = document.getElementById('game');
const gameOverEl = document.getElementById('game-over');

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        msgEl.style.display = 'block';
    }, 2000)
    setTimeout(() => {
        msgEl.style.display = 'none';
    }, 10000)
    setInterval(createBall, 1000);
});

function createBall() {
    var ball = document.createElement("div");
    ball.className = "ball";
    ball.setAttribute("id", generateUniqueString())
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    ball.style.top = `${Math.floor(Math.random() * 95)}%`
    ball.style.left = `${Math.floor(Math.random() * 95)}%`
    ball.style.background = `radial-gradient(circle at 10px 10px, ${color}, #000)`;

    document.getElementById("container").appendChild(ball);
    BALLS_ON_SCREEN++;
    remainingBallsEl.innerHTML = BALLS_ON_SCREEN;

    if (BALLS_ON_SCREEN > 10) {
        gameEl.style.display = 'none';
        gameOverEl.style.display = 'flex';

        let cursor = document.getElementById('cursor-image');
        cursor.src = 'assets/over.png';
    }


    ball.addEventListener("click", () => {
        let cursor = document.getElementById('cursor-wrapper');
        cursor.classList.add('scaled');
        setTimeout(() => {
            cursor.classList.remove('scaled');
        }, 100)

        ball.style.transform = 'scale(0.1)'
        ball.style.transition = 'all .5s ease-out'
        setTimeout(() => {
            ball.parentNode.removeChild(ball);
            BALLS_ON_SCREEN--;
            remainingBallsEl.innerHTML = BALLS_ON_SCREEN;

            POPPED_BALLS++;
            poppedBallsEl.innerHTML = POPPED_BALLS;
        }, 500)
    })
}

function generateUniqueString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueString = '';

    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        uniqueString += characters.charAt(randomIndex);
    }

    return uniqueString;
}

var cursorWrapper = document.createElement('div');
cursorWrapper.classList.add('cursor-wrapper');
cursorWrapper.setAttribute('id', 'cursor-wrapper')
document.body.appendChild(cursorWrapper);

var cursor = document.createElement('img');
cursor.setAttribute('id', 'cursor-image');
cursor.src = 'assets/pin.png';
cursorWrapper.appendChild(cursor);

document.addEventListener('mousemove', function (event) {
    cursorWrapper.style.top = (event.clientY - cursor.offsetHeight / 2) + 'px';
    cursorWrapper.style.left = (event.clientX - cursor.offsetWidth / 2) + 'px';
});

const restartEl = document.getElementById('restart');
restartEl.addEventListener('click', function () {
    location.reload()
})