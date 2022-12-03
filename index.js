const canvas = document.getElementById('animationCanvas')
const ctx = canvas.getContext('2d')
const StartButton = document.getElementById('start') 
const mass1 = document.getElementById('mass1')
const mass2 = document.getElementById('mass2')
const velocity1 = document.getElementById('velocity1')
const velocityAfter1 = document.getElementById('velocityAfter1')
const velocity2 = document.getElementById('velocity2')
const velocityAfter2 = document.getElementById('velocityAfter2')
// Globally declare variables
let ball1, ball2;
let isRunning = false;


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

const solveCollision = (mass1, mass2, v1, v2, u1, u2, missingTerm) => {
    // Formula: mass1 * mass2 *  
    let sol;
    if (missingTerm == "mass1") {
        sol = nerdamer.solveEquations(`(x)(${v1}) + (${mass2})(${v2}) = (x)(${u1}) + (${mass2})(${u2})`, 'x')
    } else if (missingTerm == "mass2") {
        sol = nerdamer.solveEquations(`(${mass1})(${v1}) + (x)(${v2}) = (${mass1})(${u1}) + (x)(${u2})`, 'x');
    }

    if (missingTerm == "velocity1") {
        sol = nerdamer.solveEquations(`(${mass1})(x) + (${mass2})(${v2}) = (${mass1})(${u1}) + (${mass2})(${u2})`, 'x')
    } else if (missingTerm == "velocity2") {
        sol = nerdamer.solveEquations(`(${mass1})(${v1}) + (${mass2})(x) = (${mass1})(${u1}) + (${mass2})(${u2})`, 'x')
    }

    if (missingTerm == "velocityAfter1") {
        sol = nerdamer.solveEquations(`(${mass1})(${v1}) + (${mass2})(${v2}) = (${mass1})(x) + (${mass2})(${u2})`, 'x')
    } else if (missingTerm == "velocityAfter2") {
        sol = nerdamer.solveEquations(`(${mass1})(${v1}) + (${mass2})(${v2}) = (${mass1})(${u1}) + (${mass2})(x)`, 'x')
    }
    console.log(parseFloat(eval(sol.toString()).toFixed(5)))
    return parseFloat(eval(sol.toString()).toFixed(5))
}

const mainLoop = () => {
    // Reset drawing of canvas
    ctx.clearRect(0, 0, 800, 400);
    // Update ball
    ball1.update()
    ball2.update()
    // Check for collision
    if ((ball1.size + ball2.size) >=  ball2.positionX - ball1.positionX) {
        console.log("Collision detected!") 
        // Do the maths or physics I should say, need velocity after
        ball1.velocity = ball1.velocityAfter;
        ball2.velocity = ball2.velocityAfter;
    }

    // Render
    ball1.draw()
    ball2.draw()

    // Check if animation is over
    if (ball1.positionX + ball1.size <= 0 && ball2.positionX + ball2.size >= 800) {
        console.log("Animation has stopped")
        animationOver()
        return;
    }
    // Repeat loop
    requestAnimationFrame(mainLoop);
}

let animationOver = () => {
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, 800, 400);
    isRunning = false;
}

let generateBalls = (value, missingTerm) => {
    // Start animation now
    if (missingTerm == "mass1") {
        ball1 = new Ball(value, parseFloat(velocity1.value), parseFloat(velocityAfter1.value), 100)
        ball2 = new Ball(parseFloat(mass2.value), parseFloat(velocity2.value), parseFloat(velocityAfter2.value), 700)
    } else if (missingTerm == "mass2") {
        ball1 = new Ball(parseFloat(mass1.value), parseFloat(velocity1.value), parseFloat(velocityAfter1.value), 100)
        ball2 = new Ball(value, parseFloat(velocity2.value), parseFloat(velocityAfter2.value), 700)
    }

    if (missingTerm == "velocity1") {
        ball1 = new Ball(parseFloat(mass1.value), value, parseFloat(velocityAfter1.value), 100)
        ball2 = new Ball(parseFloat(mass2.value), parseFloat(velocity2.value), parseFloat(velocityAfter2.value), 700)
    } else if (missingTerm == "velocity2") {
        ball1 = new Ball(parseFloat(mass1.value), parseFloat(velocity1.value), parseFloat(velocityAfter1.value), 100)
        ball2 = new Ball(parseFloat(mass2.value), value, parseFloat(velocityAfter2.value), 700)
    }

    if (missingTerm == "velocityAfter1") {
        ball1 = new Ball(parseFloat(mass1.value), parseFloat(velocity1.value), value, 100)
        ball2 = new Ball(parseFloat(mass2.value), parseFloat(velocity2.value), parseFloat(velocityAfter2.value), 700)
    } else if (missingTerm == "velocityAfter2") {
        ball1 = new Ball(parseFloat(mass1.value), parseFloat(velocity1.value), parseFloat(velocityAfter1.value), 100)
        ball2 = new Ball(parseFloat(mass2.value), parseFloat(velocity2.value), value, 700)
    }

    // If solved is undefined i.e. no value passed, then just generate the balls
    if (value == undefined) {
        ball1 = new Ball(parseFloat(mass1.value), parseFloat(velocity1.value), parseFloat(velocityAfter1.value), 100)
        ball2 = new Ball(parseFloat(mass2.value), parseFloat(velocity2.value), parseFloat(velocityAfter2.value), 700)
    }
}

let checkMissing = () => {
    let missing = [];
    if (mass1.value == "") {
        missing.push("mass1");
    }
    if (mass2.value == "") {
        missing.push("mass2");
    }
    if (velocity1.value == "") {
        missing.push("velocity1")
    }
    if (velocity2.value == "") {
        missing.push("velocity2")
    }
    if (velocityAfter1.value == "") {
        missing.push("velocityAfter1")
    }
    if (velocityAfter2.value == "") {
        missing.push("velocityAfter2")
    }
    console.log(missing)
    return missing
}

let Start = () => {
    // First check what is missing from the input
    let missingStuffInArray = checkMissing(); // Returns what is missing, like what to solve for as an array
    if (missingStuffInArray.length == 0) {
        generateBalls(undefined)
    } else if (missingStuffInArray.length > 1)  {
        alert("Cannot solve, add more information")
        return;
    } else {
        let solved = solveCollision(
            parseFloat(mass1.value), 
            parseFloat(mass2.value), 
            parseFloat(velocity1.value), 
            parseFloat(velocity2.value), 
            parseFloat(velocityAfter1.value), 
            parseFloat(velocityAfter2.value), 
            missingStuffInArray[0])
        generateBalls(solved, missingStuffInArray[0]);
    }

}

// Start Animation once clicked
StartButton.addEventListener("click", () => {
    // First reset everything
    ctx.clearRect(0, 0, 800, 400);
    if (isRunning == false) {
        Start()
        // Start animation
        requestAnimationFrame(mainLoop)
        isRunning = true;
    } else {
        // Restart balls, and their values
        Start()
    }
    // isRunning ? Start(false) : Start(true)
})


