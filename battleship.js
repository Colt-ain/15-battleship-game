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
    shipsSunk: 0,
    shipLength: 3,
    ships: [{ locations: ["10", "20", "30"], hits: ["", "", ""] },
        { locations: ["32", "33", "34"], hits: ["", "", ""] },
        { locations: ["63", "64", "65"], hits: ["", "", ""] }],
    fire: function(guess) { // метод fire перебирает все корабли и проверяет попадание
        // guess - попытка выстрела
        for ( var i=0; i<this.numShips; i++ ) {
            var ship = this.ships[i];
            var locations = ship.locations;
            var index = locations.indexOf(guess); // если возвращает -1, то строка не найдена, мимо!!!
            if ( index >= 0 ) {
                ships.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!!!");
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
    }
}
view.displayMessage("TAP TAP!!!");
// view.displayMiss("00");
 view.displayHit("34");
// view.displayMiss("55");
//
// view.displayMiss("25");
// view.displayHit("26");
model.fire("53");
model.fire("06");
model.fire("16");
model.fire("26");
model.fire("34");
model.fire("24");
model.fire("44");
model.fire("12");
model.fire("11");
model.fire("10");
