var Gameboard = (() => {
	var gameboard = ["", "", "", "", "", "", "", "", ""];

	const contentElement = document.getElementsByClassName("content")[0];
	const gameboardElement = document.getElementsByClassName("gameboard")[0];
	const gameboardCells = document.getElementsByClassName("gameboard__cell");

	function _render() {
		for (let i = 0; i < gameboard.length; i++) {
			gameboardElement.children.item(i).innerHTML = gameboard[i];
		}
	}

	function placeSymbolAt(index) {
		gameboard[index] = "X";
		_render();
	}

	for (let i = 0; i < gameboardCells.length; i++) {
		gameboardCell = gameboardCells[i];
		gameboardCell.addEventListener(
			"click",
			function () {
				placeSymbolAt(i);
			},
			true
		);
	}

	_render();

	return { placeSymbolAt };
})();
