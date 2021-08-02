var colorArray = ["red", "blue", "yellow", "green"]
var colorPattern = [];
var level = 0;
var start = 0;
var userClickedPattern = [];

function nextSequence() {
  return Math.floor(Math.random() * 4);
}

$("h1").click(function() {
  if (start == 0) {
    start = 1;
    level = 0;
    clearAll();
    nextLevel();
  }
});

function nextLevel() {
  level++;
  changeHeading(level);
  clearUserClickedPattern();
  var currentChosenColor = colorArray[nextSequence()];
  colorPattern.push(currentChosenColor);
  animate(currentChosenColor);
  playSound(currentChosenColor);
}

$(".btn").click(function() {
  if (start == 1) {
    userClickedPattern.push(this.id);
    animate(this.id);
    checkPattern(this.id);
  }
});

function checkPattern(colorSelected) {
  if (userClickedPattern[userClickedPattern.length - 1] != colorPattern[userClickedPattern.length - 1]) {
    start = 0;
    level = 0;
    gameOverAnimate();
    changeHeading(level);
    playSound("wrong");
    clearAll();
  } else if (userClickedPattern.length == colorPattern.length) {
    playSound(colorSelected);
    setTimeout(function() {
      nextLevel();
    }, 1000);
  } else {
    playSound(colorSelected);
  }
}

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animate(color) {
  var animatedElement = $("#" + color);
  animatedElement.addClass("pressed").fadeOut(100).fadeIn(100);
  setTimeout(function() {
    animatedElement.removeClass("pressed");
  }, 200);
}

function clearAll() {
  userClickedPattern = [];
  colorPattern = [];
}

function clearUserClickedPattern() {
  userClickedPattern = [];
}

function changeHeading(level) {
  if (level != 0) {
    $("h1").text("Level " + level);
  } else {
    $("h1").text("Congratulations! you reached till Level " + colorPattern.length + ". Click Here to Try Again");
  }
}

function gameOverAnimate() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200)
}
