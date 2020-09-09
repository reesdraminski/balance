const topBar    = document.getElementById("topBar");
const bottomBar = document.getElementById("bottomBar");

const topButton    = document.getElementById("topButton");
const bottomButton = document.getElementById("bottomButton");

let topInterval = 0, bottomInterval = 0;
let topBurndown = 0, bottomBurndown = 0;
let topClickIncrement = 0, bottomClickIncrement = 0;
let topBarAnimation = 0, bottomBarAnimation = 0, timer = 0;

let seconds = 0;
let gameOver = false;

// start the game when the script loads
startGame();

/**
* Start a new game.
*/
function startGame() {
    // start the game
    gameOver = false;

    // clear any leftover intervals from a previously incomplete game
    clearInterval(timer);
    clearInterval(topBarAnimation);
    clearInterval(bottomBarAnimation)

    // reset any text from another game
    document.getElementById("title").innerText = "welcome to balance";
    document.getElementById("timeMessage").innerText = "";

    // reset any potential values from another game
    topBar.value = 0;
    bottomBar.value = 0;

    // setup game components
    setupButtons();
    setupBars();

    // start recording the user's time to complete the current game
    startTimer();
}

/**
* Setup the button increment values.
*/
function setupButtons() {
    topClickIncrement    = getRandomNumber(1, 8);
    bottomClickIncrement = getRandomNumber(1, 8);

    topButton.onclick = () => {
        if (!gameOver) {
            topBar.value += topClickIncrement;

            checkWin();
        }
    }

    bottomButton.onclick = () => {
        if (!gameOver) {
            bottomBar.value += bottomClickIncrement;

            checkWin();
        }
    }
}

/**
* Setup the bar burndown times and values.
*/
function setupBars() {
    topInterval    = getRandomNumber(300, 1000);
    bottomInterval = getRandomNumber(300, 1000);

    topBurndown    = getRandomNumber(1, 8);
    bottomBurndown = getRandomNumber(1, 8);

    topBarAnimation = setInterval(() => {
        // decrement the top bar value but keep it from going negative
        if (topBar.value > 0) {
            topBar.value -= topBurndown;
        }

        // keep tabs of time by the smallest interval in only this function so there isn't 
        // two functions keeping track of time
        if (topInterval < bottomInterval) {
            seconds += (topInterval / 1000);
        }
        else {
            seconds += (bottomInterval / 1000);
        }

        checkWin();
    }, topInterval);

    bottomBarAnimation = setInterval(() => {
        // decrement the bottom bar value but keep it from going negative
        if (bottomBar.value > 0) {
            bottomBar.value -= bottomBurndown;
        }

        checkWin();
    }, bottomInterval);
}

/**
* Start the timer to keep track of how long the player has been playing
* the current game.
*/
function startTimer() {
    seconds = 0;

    timer = setInterval(() => {
        seconds += .1;
    }, 100);
}

/**
* Check if the user has one the game, and stop animations if they have.
*/
function checkWin() {
    if (bottomBar.value > 0 && topBar.value == bottomBar.value) {
        gameOver = true;

        // stop counting time
        clearInterval(timer);

        // stop the bars from moving
        clearInterval(topBarAnimation);
        clearInterval(bottomBarAnimation);

        // show the game win message
        document.getElementById("title").innerText = "congrats, you won!";
        document.getElementById("timeMessage").innerText = `it only took you: ${seconds.toFixed(2)} seconds`;
    }
}

/**
* Generates and returns a random number within a given range.
* @param {Number} min 
* @param {Number} max 
* @returns {Number} randomNumber
*/
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
