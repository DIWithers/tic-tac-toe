
var whosTurn = 1; //start off on player 1's turn
var numPlayers = 0;

var winners = [
	["A1", "A2", "A3"], //ROW 1
	["B1", "B2", "B3"],	//ROW 2
	["C1", "C2", "C3"],	//ROW 3
	["A1", "B2", "C3"],	//DIAG 1
	["A1", "B1", "C1"], // COL 1
	["A2", "B2", "C2"], // COL 2
	["A3", "B3", "C3"],	//COL 3
	["A3", "B2", "C1"]	//OTHER DIAG
	];
var compChoices = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];

	var player1 = []; // Array where we will stash the squares player1 has checked
	var player2 = []; // Array where we will stash the squares player2 has checked

	var someoneWon = false;

function twoPlayers() {
	numPlayers = 2;
}

function markSquare(square) {
	if (someoneWon) {
		console.log("Someone already won");
	}
	//Check to see if this square is in either player array. If so, goodbye
	else if ((player1.indexOf(square.id) === -1) && (player2.indexOf(square.id) === -1)) { // -1 for each search means it's in neither array

		if (whosTurn === 1) {
			square.innerHTML = "X";
			whosTurn = 2;
			player1.push(square.id);
			checkWin(player1, 1);
		}
		else if (numPlayers === 2) {
			var compPick = Math.floor(Math.random() * 8);
			var compChoice = compChoices[compPick];
			var element = document.getElementById(compChoice);
				if (element.innerHTML === "-") {
					element.innerHTML = "O";
					whosTurn = 1;
					player2.push(element);
					checkWin(player2, 2);

				}

		}

		
		else {
			square.innerHTML = "O";
			whosTurn = 1;
			player2.push(square.id);
			checkWin(player2, 2);
		}
		
	}

	else {
			console.log("Something's already there! No cheating");
	}
}

function checkWin(currentPlayersSquares, whoJustMarked) {

	//Loop through the outer array
	for (var i = 0; i < winners.length; i++) {
		// Look through each row of inner array
		var rowCount = 0;
		for (var j = 0; j < winners[i].length; j++) {
			if (currentPlayersSquares.indexOf(winners[i][j]) > -1) {
				//HIT!!!
				rowCount++;
			}
			if (rowCount ===3) {
				//BINGO!!!
				console.log("Congratulations! Player" + whoJustMarked + " won!");
				gameOver(whoJustMarked, winners[i]);
			}
		}
	}
}

function gameOver(whoWon, winningCombo) {
	var message = document.getElementById("message");
		message.innerHTML = "Congratulations to Player " + whoWon + ". You won with " + winningCombo.join(", ")

		for (var i = 0; i < winningCombo.length; i++) {
			document.getElementById(winningCombo[i]).className += " winner";
		}
		someoneWon = true;


}

function resetGame(){
	someoneWon = false;
	whosTurn = 1;
	while (player1.length){
		player1.pop();
	}
	while (player2.length){
		player2.pop();
	}
	var buttons = document.getElementsByClassName("box");
	
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].innerHTML = "-";
		buttons[i].classList.remove("winner");
	}
		
	
}
	




