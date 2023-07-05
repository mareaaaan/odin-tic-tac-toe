const Player = (name, symbol) => {
	return {
		name,
		symbol,
	};
};

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
			if (
				rows[i][0] != false &&
				rows[i].every((val, i, arr) => val === arr[0])
			) {
				return rows[i][0];
			}
			if (
				columns[i][0] != false &&
				columns[i].every((val, i, arr) => val === arr[0])
			) {
				return columns[i][0];
			}
		}

		if(gameboard[0] != false && gameboard[0] == gameboard[4] && gameboard[4] == gameboard[8] ){
			return gameboard[0];
		}

		if(gameboard[2] != false && gameboard[2] == gameboard[4] && gameboard[4] == gameboard[6] ){
			return gameboard[2];
		}

		return false;
	}

	_render();

	return { setCurrentSymbol, getWinner, reset };
})();

var GameController = (() => {
	let players = [];
	let turnNumber = 0;

	function _registerPlayer(name, symbol) {
		players.push(Player(name, symbol));
	}

	function _getCurrentPlayerIndex() {
		return turnNumber % 2;
	}

	function reset() {
		players = [];
		turnNumber = 0;
		_init();
	}

	function _init() {
		_registerPlayer("Player One", "X");
		_registerPlayer("Player Two", "O");
		Gameboard.setCurrentSymbol(players[_getCurrentPlayerIndex()].symbol);
	}

	function playTurn() {
		let winner = Gameboard.getWinner();
		if (winner != false) {
			DisplayController.showPlayAgainDialog(winner);
		} else {
			turnNumber++;
			Gameboard.setCurrentSymbol(
				players[_getCurrentPlayerIndex()].symbol
			);
		}
	}

	_init();

	return { playTurn, reset };
})();

var DisplayController = (() => {
	const body = document.body;
	const dialogText = document.getElementsByClassName("dialog__text")[0];
	const dialogButton = document.getElementsByClassName("dialog__button")[0];
	const dialog = document.getElementsByClassName("dialog")[0];
	const layer = document.getElementsByClassName("layer")[0];

	function _blurBody() {
		layer.classList.add("blur");
	}

	function _unBlurBody() {
		layer.classList.remove("blur");
	}

	function _hidePlayAgainDialog() {
		_unBlurBody();
		dialog.remove();
	}

	function showPlayAgainDialog(winner) {
		_blurBody();
		body.appendChild(dialog);
		dialogText.textContent = winner + " won!";
	}

	function _playAgain() {
		Gameboard.reset();
		GameController.reset();
	}

	dialogButton.addEventListener("click", function () {
		_playAgain();
		_hidePlayAgainDialog();
	});

	_hidePlayAgainDialog();

	return { showPlayAgainDialog };
})();
