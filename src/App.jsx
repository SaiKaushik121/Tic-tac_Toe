import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const intialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSqaureSymbol =
      gameBoard[combinations[0].row][combinations[0].column];
    const secondSqaureSymbol =
      gameBoard[combinations[1].row][combinations[1].column];
    const thirdSqaureSymbol =
      gameBoard[combinations[2].row][combinations[2].column];

    if (
      firstSqaureSymbol &&
      firstSqaureSymbol === secondSqaureSymbol &&
      firstSqaureSymbol === thirdSqaureSymbol
    ) {
      winner = players[firstSqaureSymbol];
    }
  }

  return winner;
}

function deriveGameboard(gameTurns) {
  let gameBoard = [...intialGameBoard.map((arr) => [...arr])];

  for (let turn of gameTurns) {
    const { sqaure, player } = turn;
    const { row, col } = sqaure;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

//this funnction is used for setting player as X or O
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({ X: "Player 1", O: "Player 2" });
  // this state to set the active player and use it in Player and GameBoard components
  //this is called lifting state up
  const [gameTurns, setgameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameboard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setactivePlayer((curractivePlayer) =>
    //   curractivePlayer === "X" ? "O" : "X"
    // );
    setgameTurns((prevTurns) => {
      // for setting players in here cause we might have issues if i don't add setting players here
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { sqaure: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setgameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={"Player 1"}
            symbol={"X"}
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          ></Player>
          <Player
            name={"Player 2"}
            symbol={"O"}
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          ></Player>
        </ol>

        {winner || hasDraw ? (
          <GameOver winner={winner} onRestart={handleRestart}></GameOver>
        ) : (
          <p>winner is yet to be declared</p>
        )}

        <GameBoard
          onSelectSqaure={handleSelectSquare}
          board={gameBoard}
        ></GameBoard>
      </div>
      <Log turns={gameTurns}></Log>
    </main>
  );
}

export default App;
