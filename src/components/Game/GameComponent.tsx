import React, { FC } from 'react';

import Board from 'components/Board';

interface GameProps {
  squares: string[];
  onClick: (i: number) => () => void;
  status: string;
}

const Game: FC<GameProps> = ({ squares, onClick, status }) => (
  <div className="game">
    <div className="game-board">
      <Board squares={squares} onClick={onClick} />
    </div>
    <div className="game-info">
      <div>{status}</div>
    </div>
  </div>
);

export default Game;
