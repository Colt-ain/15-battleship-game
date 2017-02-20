// Объект представления
var view = {
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},

	displayHit: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},

	displayMiss: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	}
};
// var ships = [
//     { locations: ["10", "20", "30"], hits: ["", "", ""] },
//     { locations: ["32", "33", "34"], hits: ["", "", ""] },
//     { locations: ["63", "64", "65"], hits: ["", "", "hit"] }
// ];

var model = {
    boardSize: 7,
    numShips: 3,
    shipsSunk: 0, // переменная количество потопленных кораблей
    shipLength: 3, // длина кораблей
    ships: [{ locations: [0, 0, 0], hits: ["", "", ""] },
            { locations: [0, 0, 0], hits: ["", "", ""] },
            { locations: [0, 0, 0], hits: ["", "", ""] }],
    fire: function(guess) { // метод fire перебирает все корабли и проверяет попадание
        // guess - попытка выстрела
        for ( var i=0; i < this.numShips; i++ ) {
            var ship = this.ships[i];
            var locations = ship.locations;
            var index = locations.indexOf(guess); // если возвращает -1, то строка не найдена, мимо!!!
            if ( index >= 0 ) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT! ");
                if (this.isSunk(ship)) {
                    view.displayMessage("You sank my battleship!");
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed.");
        return false;
    },
    isSunk: function(ship) {
        for ( var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
            return true;
        }
    },
    generateShipLocations: function() {
        var locations;
        for (var i=0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            } while (this.collision(locations));
                this.ships[i].locations = locations;
        }
    },
    generateShip: function() {
        var direction = Math.floor(Math.random() * 2);
        var row, col;
        if ( direction === 1 ) {
            // генерация вертик
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength));

        } else {
            // генерация горизонт
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            col = Math.floor(Math.random() * this.boardSize);
        }
        var newShipLocations = [];
        for (var i=0; i < 3; i++) {
            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i));
            } else {
                newShipLocations.push((row + i) + "" + col);
            }
        }
        //console.log(newShipLocations);

        return newShipLocations;
    },
    collision: function(locations) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = model.ships[i];
            for (var j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
    }
}
// объект контроллера
var controller = {
    guess: 0,
    processGuess: function(guess) {
        var location = parseGuess(guess);
        if (location) {
            this.guesses++;
            var hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
            }
        }
    }
}
// Вспомогательная функция для проверки введенных значений
function parseGuess(guess) {
    var alphabet =  ["A", "B", "C", "D", "E", "F", "G"];
    if (guess === null || guess.length !== 2) {
        alert("Oops, please enter a letter and a number on the board.");
    } else {
        firstChar = guess.charAt(0);
        var row = alphabet.indexOf(firstChar);
        }
    var column = guess.charAt(1);
    if ( isNaN(row) || isNaN(column) ) {
        alert("Oops, that isn't on the board.");
    } else if ( row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize ) {
        alert("Oops, that's off the board!");
    } else {
        return row + column;
    }
    return null;
}

// Функция передачи данных из формы

function init() {
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;

    model.generateShipLocations();
}
function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.processGuess(guess);
    // Для замены на пустую строку в поле ввода
    guessInput.value = "";
}

function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    if ( e.keyCode === 13 ) {
        fireButton.click();
        return false;
    }
}
window.onload = init;


// view.displayMiss("00");
//view.displayHit("34");
// view.displayMiss("55");
//
// view.displayMiss("25");
// view.displayHit("26");
//
// model.fire("53");
// model.fire("06");
// model.fire("16");
// model.fire("26");
// model.fire("34");
// model.fire("24");
// model.fire("44");
// model.fire("12");
// model.fire("11");
// model.fire("10");
// console.log(parseGuess("A0"));
// console.log(parseGuess("B6"));
// console.log(parseGuess("G3"));
// console.log(parseGuess("A0"));
// controller.parseGuess("A0");
// controller.processGuess("A6");
// controller.processGuess("B5");
// controller.processGuess("C6");
// controller.processGuess("C4");
// controller.processGuess("D4");
// controller.processGuess("E4");
// controller.processGuess("B0");
// controller.processGuess("B1");
// controller.processGuess("B2");
