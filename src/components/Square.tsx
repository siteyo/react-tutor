import React, { FC } from 'react';

interface SquareProps {
  value: string;
  onClick: () => void;
}

const Square: FC<SquareProps> = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

export default Square;
