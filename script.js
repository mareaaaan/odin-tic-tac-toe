var Gameboard = (() => {
	var gameboard = ["", "", "", "", "", "", "", "", ""];

	const gameboardElement = document.getElementsByClassName("gameboard")[0];
	const gameboardCells = document.getElementsByClassName("gameboard__cell");

	function _render() {
		for (let i = 0; i < gameboard.length; i++) {
			gameboardElement.children.item(i).innerHTML = gameboard[i];
		}
	}

	function placeSymbolAt(index, symbol) {
		gameboard[index] = symbol;
		_render();
	}

	function setCurrentSymbol(symbol) {
		for (let i = 0; i < gameboardCells.length; i++) {
			gameboardCell = gameboardCells[i];
			gameboardCell.addEventListener(
				"click",
				function () {
					placeSymbolAt(i, symbol);
				},
				true
			);
		}
	}

	_render();

	return { placeSymbolAt, setCurrentSymbol };
})();

var GameController = (() => {
	let players = [];
	let playerScores = [];
	let turnNumber = 0;

	function registerPlayer(name, symbol) {
		players.push(Player(name, symbol));
		playerScores.push(0);
	}

	function _getCurrentPlayerIndex() {
		return turnNumber % 2;
	}

	function _initGame() {
		registerPlayer("Player One", "X");
		registerPlayer("Player Two", "O");
	}

	function _isGameFinished() {
		return;
	}

	function playRound() {
		_initGame();
		Gameboard.setCurrentSymbol(players[_getCurrentPlayerIndex()].symbol);
		turnNumber++;
		// while (!_isGameFinished()) {
		// }
	}
	return { playRound };
})();

const Player = (name, symbol) => {
	return {
		name,
		symbol,
	};
};

GameController.playRound();
