import React, { FC, useState, useEffect } from 'react';

import GameComponent from 'components/Game/GameComponent';

const useGame = (): [string[], (i: number) => () => void, string] => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameStatus, setGameStatus] = useState('');

  const calculateWinner = (squares: string[]): string | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number) => () => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setSquares(squares);
    setXIsNext(prev => !prev);
  };

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setGameStatus('Winner: ' + winner);
    } else {
      setGameStatus('Next player: ' + (xIsNext ? 'X' : 'O'));
    }
  }, [squares, xIsNext]);

  return [squares, handleClick, gameStatus];
};

const GameContainer: FC = () => {
  const [squares, handleClick, gameStatus] = useGame();
  return (
    <GameComponent
      squares={squares}
      onClick={handleClick}
      status={gameStatus}
    />
  );
};

export default GameContainer;
