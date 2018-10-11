var numColors = 6; 
var colors;
var pickedColor;

var squares = document.querySelectorAll(".square"); 
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset"); 
var modeBtns = document.querySelectorAll(".mode");

init();

function init() {
	initializeModeButtons(); 
	initializeSquareListeners(); 
	initializeResetButton(); 
	resetGame();
}

function initializeModeButtons() {
	for (var i = 0; i < modeBtns.length; i++) {
		modeBtns[i].addEventListener("click", function() {
			for (var j = 0; j < modeBtns.length; j++) {
				modeBtns[j].classList.remove("selected");
			}
			this.classList.add("selected");

			if (this.textContent === "Easy") {
				numColors = 3;
			} else if (this.textContent === "Medium") {
				numColors = 6;
			} else {
				numColors = 9; 
			}

			resetGame();
		})
	}
}

function initializeSquareListeners() {
	for (var i = 0; i < squares.length; i++) {		
		squares[i].addEventListener("click", function() {
			var clickedColor = this.style.backgroundColor; 

			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!"
				changeAllSquaresToCorrectColor(clickedColor); 
				resetButton.textContent = "Play Again?";
				h1.style.backgroundColor = clickedColor; 
			} else {
				this.style.backgroundColor = "#232323"; 
				messageDisplay.textContent = "Try again"; 
			}
		});
	}
}

function changeAllSquaresToCorrectColor(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color; 
	}
}

function initializeResetButton() {
	resetButton.addEventListener("click", function() {
		resetGame(); 
	});
}

function resetGame() {
	colors = generateRandomColors(numColors);
	pickedColor = pickColor(); 
	colorDisplay.textContent = pickedColor; 
	resetButton.textContent = "New Colors"; 
	h1.style.backgroundColor = "steelblue";
	messageDisplay.textContent = ""; 
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.backgroundColor = colors[i]; 
			squares[i].style.display = "block"; 
		} else {
			squares[i].style.display = "none"; 
		}
	}
}

function generateRandomColors(num) {
	var arr = [];

	var selectedMode = document.querySelector(".selected"); 

	for (var i = 0; i < num; i++) {
		if (selectedMode.textContent === "Boss") {
			arr.push(grayscaleColor()); 
		} else {
			arr.push(randomColor()); 
		}
	}
	
	return arr; 
}

function grayscaleColor() {
	var n = Math.floor(Math.random() * 256);

	return "rgb(" + n + ", " + n + ", " + n + ")";
}

function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function pickColor() {
	return colors[Math.floor(Math.random() * colors.length)]; 
}