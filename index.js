const canvas = document.getElementById('animationCanvas')
const ctx = canvas.getContext('2d')
const StartButton = document.getElementById('start') 
const mass1 = document.getElementById('mass1')
const mass2 = document.getElementById('mass2')
const velocity1 = document.getElementById('velocity1')
const velocityAfter1 = document.getElementById('velocityAfter1')
const velocity2 = document.getElementById('velocity2')
const velocityAfter2 = document.getElementById('velocityAfter2')

class Ball {
    constructor(mass, velocity, velocityAfter, positionX) {
        this.mass = mass;
        this.velocity = velocity;
        this.velocityAfter = velocityAfter;
        this.positionX = positionX;
        this.positionY = (canvas.height / 2);
        this.size = mass * 1.667;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.positionX, this.positionY, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'gray';
        ctx.fill()
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.font = '8pt Calibri';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        // ctx.fillText('0', x, y+3);
        ctx.fillText(`${this.mass}g`, this.positionX, this.positionY)
        ctx.closePath();
    }

    update() {
        this.positionX +=  this.velocity;
    }

}

// Declare variables
let ball1, ball2;
let isRunning = false;

const solveCollision = (mass1, mass2, v1, v2, u1, u2) => {
    if (mass1 == undefined) {

    } else if (mass2 == undefined) {

    }

    if (v1 == undefined) {

    } else if (v2 == undefined) {

    }

    if (u1 == undefined) {

    } else if (u2 == undefined) {

    }
}

const mainLoop = () => {
    // Reset drawing of canvas
    ctx.clearRect(0, 0, 800, 400);
    // Update ball
    ball1.update()
    ball2.update()
    // Check for collision
    if ((ball1.size + ball2.size) >=  ball2.positionX - ball1.positionX) {
        console.log(ball1.velocityAfter, ball2.velocityAfter)
        console.log("Collision detected!") 
        // Do the maths or physics I should say, need velocity after
        // if (ball1.velocityAfter) {
        //     console.log(`V1 = ${ball1.velocity}`)
        //     ball1.velocity = ball1.velocityAfter;
        // }
        // if (ball2.velocityAfter) {
        //     console.log(`V2 = ${ball2.velocity}`)
        //     ball2.velocity = ball2.velocityAfter;
        // }
    }
    // Render
    ball1.draw()
    ball2.draw()
    // Repeat loop
    requestAnimationFrame(mainLoop);
}
// Start Animation once clicked
StartButton.addEventListener("click", () => {
    // First reset everything
    ctx.clearRect(0, 0, 800, 400);
    if (!isRunning) {
        ball1 = new Ball(parseFloat(mass1.value), parseFloat(velocity1.value), parseFloat(velocityAfter1.value), 100)
        ball2 = new Ball(parseFloat(mass2.value), parseFloat(velocity2.value), parseFloat(velocityAfter2.value), 700)
        // solveCollision(parseFloat(mass1.value), parseFloat(mass2.value), parseFloat(velocity1.value))
        requestAnimationFrame(mainLoop)
        isRunning = true;
    } else {
        // Just redeclare the variables
        // ball1 = new Ball(parseFloat(mass1.value), parseFloat(velocity1.value), 100)
        // ball2 = new Ball(parseFloat(mass2.value), parseFloat(velocity2.value), 700)
        ball1 = new Ball(parseFloat(mass1.value), parseFloat(velocity1.value), parseFloat(velocityAfter1.value), 100)
        ball2 = new Ball(parseFloat(mass2.value), parseFloat(velocity2.value), parseFloat(velocityAfter2.value), 700)
    }
})


