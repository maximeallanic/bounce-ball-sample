const balloon: any = document.querySelector('.balloon');

let isHandle = false;
let velocity = 0;
let balloonPosition = balloon.getBoundingClientRect();
let direction = 'down';

dropBalloon();

function getBalloonBottom() {
    return parseInt(window.getComputedStyle(balloon).bottom);
}

function setBalloonBottom(bottom) {
    balloon.style.bottom = bottom + 'px';
}

function getBalloonLeft() {
    return parseInt(window.getComputedStyle(balloon).left);
}

function setBalloonLeft(left) {
    balloon.style.left = left + 'px';
}

function dropBalloon() {
    direction = 'down';
    animate();
}

function animateUp() {
    velocity -= 1;
    const bottom = getBalloonBottom() + velocity;
    setBalloonBottom(bottom);
    if (velocity <= 0) {
        direction = 'down';
    }
}

function animateDown() {
    velocity += 1;

    const bottom = getBalloonBottom() - velocity;
    setBalloonBottom(bottom);
    if (bottom <= 0) {
        direction = 'up';
    }
}


function animate() {
    if (isHandle)
        return;
    if (direction === 'down')
        animateDown();
    else
        animateUp();

    const bottom = getBalloonBottom();
    if (velocity == 0 && bottom <= 0)
        return;
    setTimeout(() => {
        animate();
    }, 20);
}

balloon.addEventListener('mousedown', () => {
    isHandle = true;
});

document.body.addEventListener('mousemove', (event) => {
    if (isHandle) {
        const left = getBalloonLeft() + event.movementX;
        setBalloonLeft(left);
        const bottom = getBalloonBottom() - event.movementY;
        setBalloonBottom(bottom);
    }
});

document.body.addEventListener('mouseup', () => {
    if (isHandle) {
        isHandle = false;
        dropBalloon();
    }
});

document.body.addEventListener('mouseleave', () => {
    if (isHandle) {
        isHandle = false;
        dropBalloon();
    }
});