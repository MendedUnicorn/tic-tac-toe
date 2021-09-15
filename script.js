

const gameBoard = (() => {
    let container = document.querySelector("#container")
    let gameBoardArray = [[[],[],[]],[[],[],[]],[[],[],[]]] //[[["x"],["x"],["x"]],[["o"],["x"],["o"]], [["o"],["o"],["o"]]]
    let updateSquare = function ( squareId, player) {
        let index = 0
        this.gameBoardArray.forEach((row, i) => {
            row.forEach((square, j) => {
                if(squareId == index) {
                    console.log({player})
                    this.gameBoardArray[i][j] = player == 1 ? "X" : "O"  // whatever based on what palyer has: player.playerMark
                    document.querySelector(`div[data-id="${index}"]`).innerText = this.gameBoardArray[i][j]

                }
                index++
            })
        })

    }
    let drawGameBoard = function () {
        let squareId = 0;
        let body = document.querySelector("body")
        
       
        
        this.gameBoardArray.forEach((element) => {
            let rowDiv = document.createElement("div")
            rowDiv.classList.add("row")
            container.appendChild(rowDiv)
            element.forEach((element) => {
                let square = document.createElement("div")
                square.classList.add("square")
                square.setAttribute("data-id", squareId)
                square.innerText = element.length  ? element[0] : ""
                square.addEventListener("click" , (e) =>{
                    gameBoard.updateSquare(e.target.attributes["data-id"].value, game.playersTurn)
                    console.log("click", game.playersTurn)
                    game.toggleCurrentPlayer()
                    console.log("after click",  game.playersTurn)
                })
                rowDiv.appendChild(square)
                squareId++;
            })
        });
    }
    
    let clear = function () {
        this.gameBoardArray = [[[],[],[]],[[],[],[]],[[],[],[]]] //clear the aray
        container.querySelectorAll(".row").forEach(row => row.remove())
        this.drawGameBoard()
    }

    return {
        gameBoardArray,
        drawGameBoard,
        updateSquare,
        clear
    }
    
})()
//gameBoard.drawGameBoard()

const displayController = (() => {

})

const player = (playernumber) => {
    let playerNumber = playernumber
    let playerScore = 0
    let isPlayerTurn = false;
    let playerMark = playerNumber == 1 ? "X" : "O" //X or O

    return {
        playerNumber,
        playerScore,
        isPlayerTurn,
        playerMark
    }
}

const game = (() => {
    this.playersTurn = 1; //which players turn is it, 1 or 2. 
    let toggleCurrentPlayer = function() {
        this.playersTurn =  this.playersTurn - 1 ? 1 : 2
        console.log("fwefew",playersTurn)
    }
    let startGame = function(){
        gameBoard.drawGameBoard()
        let playerOne = player(1)
        let playerTwo = player(2)
        console.log(playerOne)



    }
    return {
        playersTurn,
        toggleCurrentPlayer,
        startGame,
        self
    }


})()

game.startGame()