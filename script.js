var Gameboard = (() => {
	var gameboard = ["", "", "", "", "", "", "", "", ""];

	const gameboardElement = document.getElementsByClassName("gameboard")[0];
	const gameboardCells = document.getElementsByClassName("gameboard__cell");

	function _render() {
		for (let i = 0; i < gameboard.length; i++) {
			gameboardElement.children.item(i).innerHTML = gameboard[i];
		}
	}

	function reset() {
		for (let i = 0; i < gameboard.length; i++) {
			gameboard = ["", "", "", "", "", "", "", "", ""];
		}
		_render();
	}

	function placeSymbolAt(index, symbol) {
		if (gameboard[index] == "") {
			gameboard[index] = symbol;
			_render();
		}
	}

	function _removeCurrentSymbol() {
		for (let i = 0; i < gameboardCells.length; i++) {
			gameboardCell = gameboardCells[i];
			gameboardCell.replaceWith(gameboardCell.cloneNode(true));
		}
	}

	function setCurrentSymbol(symbol) {
		_removeCurrentSymbol();
		for (let i = 0; i < gameboardCells.length; i++) {
			gameboardCell = gameboardCells[i];
			gameboardCell.addEventListener(
				"click",
				function () {
					placeSymbolAt(i, symbol);
					GameController.playTurn();
				},
				{ once: true }
			);
		}
	}

	function getWinner() {
		let rows = [
			[false, false, false],
			[false, false, false],
			[false, false, false],
		];

		let columns = [
			[false, false, false],
			[false, false, false],
			[false, false, false],
		];

		for (let i = 0; i < 9; i++) {
			rows[Math.floor(i / 3)][i % 3] = gameboard[i];
			columns[i % 3][Math.floor(i / 3)] = gameboard[i];
		}

		for (let i = 0; i < 3; i++) {
			if(rows[i][0] != false && rows[i].every( (val, i, arr) => val === arr[0])) {
				return rows[i][0];
			}
			if(columns[i][0] != false && columns[i].every( (val, i, arr) => val === arr[0] )) {
				return columns[i][0];
			}
		}
		return false;
	}

	_render();

	return { placeSymbolAt, setCurrentSymbol, getWinner, reset };
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

	function _reset() {
		players = [];
		playerScores = [];
		turnNumber = 0;
		play();
	}

	function _initGame() {
		registerPlayer("Player One", "X");
		registerPlayer("Player Two", "O");
	}

	function playTurn() {
		let winner = Gameboard.getWinner();
		if (winner != false) {
			_reset();
			Gameboard.reset();
		} else {
			turnNumber++;
			Gameboard.setCurrentSymbol(
				players[_getCurrentPlayerIndex()].symbol
			);
		}
	}

	function play() {
		_initGame();
		Gameboard.setCurrentSymbol(players[_getCurrentPlayerIndex()].symbol);
	}
	return { play, playTurn };
})();

const Player = (name, symbol) => {
	return {
		name,
		symbol,
	};
};

GameController.play();
