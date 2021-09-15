
const gameBoard = (() => {
    //console.log("this i n gameboard ", this)
    let container = document.querySelector("#container")
    let board;
    let gameBoardArray = [["x","",""],["","o","x"],["","o",""]] //[[["x"],["x"],["x"]],[["o"],["x"],["o"]], [["o"],["o"],["o"]]]
    let renderBoard = function() {
        //console.log("tihs in render ", this)
        let squareDataId = 0
        if(board) board.remove()
        board = document.createElement("div")
        board.id = "board"
        container.appendChild(board)
        gameBoardArray.forEach((rowEl, i) => {
            let row = document.createElement("div")
            row.classList.add("row")
            board.appendChild(row)
            rowEl.forEach((squareEl, j) => {
                //console.log("this in loop", this)
                let square = document.createElement("div")
                square.classList.add("square")
                row.appendChild(square)
                square.setAttribute("data-y", i)
                square.setAttribute("data-x", j)
                squareDataId++
                //console.log(gameBoardArray[i][j])
                square.innerText = gameBoardArray[i][j]
                square.addEventListener("click", (e) => {
                   // console.log(e.target)
                    let x = e.target.attributes["data-x"].value
                    let y = e.target.attributes["data-y"].value
                    makeMark(x, y)
                    renderBoard()
                    game.togglePlayerTurn()
                    //console.log( {game})
                    //console.log(game.playerTurn)
                    })
            })
        })
    }
    let makeMark = function(x, y) {
        if (gameBoardArray[y][x] === "") {
            gameBoardArray[y][x] = game.playerTurn - 1 ? game.playerTwo.mark : game.playerTwo.mark 
            console.log(window.playerTwo)
        }
    }
    let clear = function() {
        gameBoardArray = [["","",""],["","",""],["","",""]]
        renderBoard()
    }
    return {
        renderBoard,
        clear, 
    }
})()
    
const displayController = (() => {
    
})
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
    //let that = this
    console.log("this in game: ", this)
    let playerOne ={};
    let playerTwo={};
    let createPlayers = function() {
        console.log("this in create players", this)
        let playerOneNameInput = document.querySelector("#player-one").value
        let playerTwoNameInput = document.querySelector("#player-two").value
        this.playerOne = player(1, playerOneNameInput) 
        this.playerTwo = player(2, playerTwoNameInput) 
    }
    let a;

    let gameStartButton = document.querySelector("#start")
    gameStartButton.addEventListener("click", e => {
        e.preventDefault()
        a = () => {createPlayers()}
        a()
        init()
    })
    this.playerTurn = 1;
    let togglePlayerTurn = function () {
        console.log("this in palyerturn",this)
        this.playerTurn = this.playerTurn != 2 ? 2 : 1
    }
    let init = function(playerOneName, playerTwoName) {
        console.log("this in init", this)
        gameBoard.renderBoard()
       
         
        //console.log({playerTwo})
        
    }
    return {
        togglePlayerTurn,
        playerTurn,
        playerOne,
        playerTwo
    }

})()

