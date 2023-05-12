const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

// MAIN CLASS
class Field {

    constructor(field) {
        this.field = field;
        this.playerX = 0;
        this.playerY = 0;
    }

    print() {
        this.field.forEach((row) => {
            let rowString = ''
            row.forEach((symbol) => {
                rowString += symbol
            })
            console.log(rowString)
        })
        console.log("Which way?")
    }

    calcNewPosition(move) {
        if (move === 'd') {
            this.playerX += 1
        }
        if (move === 'r') {
            this.playerY += 1
        }
        if (move === 'l') {
            this.playerX += 1
        }
    }

    printNewPosition() {
        this.field[this.playerX][this.playerY] = "*"
        this.print()
    }

    askForMove() {
        return prompt('')
    }

    outOfRange() {
        return !(
            Boolean(this.field[this.playerX]) &&
            Boolean(this.field[this.playerY])
        )
    }

    inHole() {
        if (!this.outOfRange()) {
            return this.field[this.playerX][this.playerY] === "O"
        } else {return false}
    }

    isHat() {
        if (!this.outOfRange()) {
            return this.field[this.playerX][this.playerY] === "^"
        } else {return false}
    }
}

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);


function PlayGame() {
    let gameOver = false
    while (!gameOver) {
        myField.print()
        myField.calcNewPosition(myField.askForMove())

        if (myField.inHole()) {
            console.log('Ooops hole')
            gameOver = true
        } else if (myField.outOfRange()) {
            console.log('Ooops out of bounds')
            gameOver = true
        } else if (myField.isHat()){
            console.log('Yay you got the hat')
            gameOver = true
        } else {
            myField.printNewPosition()
        }
    }
}

PlayGame()