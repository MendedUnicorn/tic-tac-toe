
const gameBoard = (() => {
    let container = document.querySelector("#container")
    let board;
    let gameBoardArray = [["","",""],["","",""],["","",""]] //[[["x"],["x"],["x"]],[["o"],["x"],["o"]], [["o"],["o"],["o"]]]
    let renderBoard = function() {
        let squareDataId = 0
        if(board) board.remove()
        board = document.createElement("div")
        board.id = "board"
        container.appendChild(board)
        gameBoard.gameBoardArray.forEach((rowEl, i) => {
            let row = document.createElement("div")
            row.classList.add("row")
            board.appendChild(row)
            rowEl.forEach((squareEl, j) => {                
                let square = document.createElement("div")
                square.classList.add("square")
                row.appendChild(square)
                square.setAttribute("data-y", i)
                square.setAttribute("data-x", j)
                squareDataId++
                square.innerText = gameBoard.gameBoardArray[i][j]
                square.addEventListener("click", (e) => {
                    let x = e.target.attributes["data-x"].value
                    let y = e.target.attributes["data-y"].value
                    if (!game.gameFinished) {
                        makeMark(x, y)
                        renderBoard()
                        game.checkIfWon() 
                        game.togglePlayerTurn()
                        displayController.updateDisplay()

                    }    
                })
            })
        })
    }
    let makeMark = function(x, y) {
        if (!game.gameFinished) {
            if (gameBoard.gameBoardArray[y][x] === "") {
                gameBoard.gameBoardArray[y][x] = game.playerTurn - 1 ? game.playerTwo.mark : game.playerOne.mark 
                
            }
        }
    }
    let clear = function() {
        this.gameBoardArray = [["","",""],["","",""],["","",""]]
        renderBoard()
        game.numberOfMarks = 0
        game.gameFinished = false;
        game.playerTurn = 1;
    }
    return {
        renderBoard,
        clear, 
        gameBoardArray
    }
})()
gameBoard.renderBoard()    
const displayController = (() => {
    let display = document.querySelector("#display")
    const updateDisplay = function() {
        if (game.winner) {
            display.innerText = 
            (game.winner == 1 ? (game.playerOne.playerName||"Player One") : (game.playerTwo.playerName|| "Player Two")) + " is the Winner"
        } 
        if(!game.gameFinished) display.innerText = game.playerTurn - 1 ? "Plater Two's Turn" : "Player One's Turn"
    }
    return {
        updateDisplay
    }

    
})()
const player = (playernumber, playername = "Player " + playernumber) => {
    let playerNumber = playernumber;
    let mark = playerNumber - 1 ? "O" : "X" 
    let playerName = playername
 
    return {
        playerNumber,
        mark,
        playerName
    }
}
const game = (() => {
    let gameFinished = false
    let numberOfMarks = 0
    let playerOne ={};
    let playerTwo={};
    let winner;
    const createPlayers = function() {
        let playerOneNameInput = document.querySelector("#player-one").value
        let playerTwoNameInput = document.querySelector("#player-two").value
        this.playerOne = player(1, playerOneNameInput) 
        this.playerTwo = player(2, playerTwoNameInput) 
    }

    let gameStartButton = document.querySelector("#start")
    gameStartButton.addEventListener("click", (e) => {
        e.preventDefault()
        game.createPlayers() 
        init()
    })
    this.playerTurn = 1;
    const togglePlayerTurn = function () {
        //console.log("this in palyerturn",this)
        this.playerTurn = this.playerTurn != 2 ? 2 : 1
    }
const checkIfWon = function() {
    let z = gameBoard.gameBoardArray
    let conditions = [
        [z[0][0], z[0][1], z[0][2]],
        [z[1][0], z[1][1], z[1][2]],
        [z[2][0], z[2][1], z[2][2]],
        [z[0][0], z[1][0], z[2][0]],
        [z[0][1], z[1][1], z[2][1]],
        [z[0][2], z[1][2], z[2][2]],
        [z[0][0], z[1][1], z[2][2]],
        [z[0][2], z[1][1], z[2][0]]
        ]

    conditions.forEach((conditionSet, i) => {
        const allEqual = arr => arr.every(number => number === arr[0])
        if (allEqual(conditionSet) && conditionSet[0] != "") {
            this.gameFinished = true
            this.winner =  conditionSet[0] == game.playerOne.mark ? 1 : 2
            displayController.updateDisplay()
            
        } else if (this.numberOfMarks == 9) {
            gameFinished = true
            displayController.updateDisplay()
        }
    })
}

    let init = function(playerOneName, playerTwoName) {
        gameBoard.renderBoard() 
        displayController.updateDisplay() 
    }
    return {
        togglePlayerTurn,
        playerTurn,
        playerOne,
        playerTwo,
        createPlayers,
        checkIfWon, 
        numberOfMarks
    }

})()

