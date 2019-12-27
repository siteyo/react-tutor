import React, { FC, useState, useEffect } from 'react';

import GameComponent from 'components/Game/GameComponent';

const useGame = (): [string[], (i: number) => () => void, string] => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameStatus, setGameStatus] = useState('');
  const [winner, setWinner] = useState('');

  const calculateWinner = (squares: string[]): string => {
    const lines: number[][] = [
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
    return '';
  };

  const handleClick = (i: number) => () => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
  };

  useEffect(() => {
    const win = calculateWinner(squares);
    if (win) {
      setWinner(win);
    } else {
      setXIsNext(prev => !prev);
    }
  }, [squares]);

  useEffect(() => {
    setGameStatus('Winner: ' + winner);
  }, [winner]);

  useEffect(() => {
    setGameStatus('Next player: ' + (xIsNext ? 'X' : 'O'));
  }, [xIsNext]);

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
