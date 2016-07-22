
// N GRID VERSION
var whosTurn = 1; //start off on player 1's turn
var numPlayers = 2;

var alph = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
var winners = []
var gridSize = 5;

// We want a0, a1, a2, a3, a4,...aN and b0, b1, b2, b3, b4, bN....
var diag1 = [];
var diag2 = [];

// 1.Build a winners array 
for (var i = 0; i < gridSize; i++) {
	diag1.push(alph[i] + (gridSize - i)); //Diag 1
	diag2.push(alph[i] + i); //Diag 2
	var winnersInsideH = [];
	var winnersInsideV = [];
	for (var j = 0; j < gridSize; j++) {
		//Horizontal winners
		winnersInsideH.push(alph[j] + i);
		//Vertical winners
		winnersInsideV.push(alph[i] + j);
	}
	winners.push(winnersInsideH);
	winners.push(winnersInsideV);
}
	winners.push(diag1);
	winners.push(diag2);



// 2.We need to populate the board


	var player1 = []; // Array where we will stash the squares player1 has checked
	var player2 = []; // Array where we will stash the squares player2 has checked

	var someoneWon = false;

// function compIsPlayer() {
// 	numPlayers = 1;
// }
// function compTurn() {
// 				var compPick = Math.floor(Math.random() * 8);
// 				var compChoice = compChoices[compPick];
// 				var element = document.getElementById(compChoice);
// 					if (element.innerHTML === "-") {
// 						element.innerHTML = "O";
// 						whosTurn = 1;
// 						player2.push(element);
// 						checkWin(player2, 2);

// 				}
// 			}

function markSquare(square) {
	if (someoneWon) {
		console.log("Someone already won");
	}
	//Check to see if this square is in either player array. If so, goodbye
	else if ((player1.indexOf(square.id) === -1) && (player2.indexOf(square.id) === -1)) { // -1 for each search means it's in neither array

		if (numPlayers === 2) {

			if (whosTurn === 1) {
				square.innerHTML = "X";
				whosTurn = 2;
				player1.push(square.id);
				checkWin(player1, 1);
			}
		
			else {
				square.innerHTML = "O";
				whosTurn = 1;
				player2.push(square.id);
				checkWin(player2, 2);
			}
		
		}

		// else if (numPlayers === 1) {
		// 	if (whosTurn === 1) {
		// 		square.innerHTML = "X";
		// 		whosTurn = 2;
		// 		player1.push(square.id);
		// 		checkWin(player1, 1);
		// 		compTurn();
			
		// 	}
		// }
	}

	else {
			console.log("Something's already there! No cheating");
	}
}
 
 // function compTurn() {

			
	// 		var compPick = Math.floor(Math.random() * 8);
	// 		var compChoice = compChoices[compPick];
	// 		var element = document.getElementById(compChoice);
	// 			if (element.innerHTML === "-") {
	// 				element.innerHTML = "O";
	// 				whosTurn = 1;
	// 				player2.push(element);
	// 				checkWin(player2, 2);

	// 			}
			
	// 	}


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


 
	




