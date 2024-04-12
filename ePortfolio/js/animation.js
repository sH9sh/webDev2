const aBox = document.querySelector('.a-box');
const aStart = document.querySelector('#a-start');
const aStop = document.querySelector('#a-stop');
const aSpeed = document.querySelector('#a-speed');
const aSpeedDisplay = document.querySelector('#a-speed-display');
const aCircle = document.querySelector('.a-circle')

// console.log(aCircle);
// console.log(aBox);
// console.log(aStart);
// console.log(aStop);
// console.log(aSpeed);
// console.log(aSpeedDisplay);

// Animation start button
aStart.addEventListener('click', startAnimation);

function startAnimation(){                  // Declared function.
    aBox.style.animationPlayState = 'running';
    aCircle.style.animationPlayState = 'running';
}


// Animation stop button
aStop.addEventListener('click', function(){         // Undeclared function.
    aBox.style.animationPlayState = 'paused';
    aCircle.style.animationPlayState = 'paused';
    playSound();
});


// Animation speed control
aSpeed.addEventListener('change', function(e1){
    // Get the new value from the range input that has triggered this event and store it in.
    // a variable called speed.
    let speed = e1.currentTarget.value;

    // Update the span inner text to display the new speed value.
    aSpeedDisplay.innerText = speed;

    // Set the speed of the animation to match the users selection
    aBox.style.animationDuration = speed + 's';
    aCircle.style.animationDuration = speed + 's';
});

// If animation-iteration-count is not set to infinite, play the sound when the animation ends.
aBox.addEventListener('animationend', playSound);

// Function to play a sound when animation stops.
function playSound(){
    var audio = new Audio('http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/extralife.ogg');

    audio.play();

}