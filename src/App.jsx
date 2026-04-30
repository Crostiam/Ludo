import React, { useState, useEffect } from 'react';
import { database, ref, set, onValue } from './firebase';

export default function App() {
  const [gameState, setGameState] = useState({
    dice: 1,
    turn: 'Red',
    positions: { Red: 0, Green: 0, Yellow: 0, Blue: 0 },
  });

  useEffect(() => {
    const gameRef = ref(database, 'games/room1');
    const unsubscribe = onValue(gameRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setGameState(data);
      }
    });
    return () => unsubscribe();
  }, []);

  const rollDice = () => {
    const newDice = Math.floor(Math.random() * 6) + 1;
    const newPositions = { ...gameState.positions };

    newPositions[gameState.turn] = Math.min(
      57, 
      newPositions[gameState.turn] + newDice
    );

    const order = ['Red', 'Green', 'Yellow', 'Blue'];
    const currentIdx = order.indexOf(gameState.turn);
    const nextTurn = order[(currentIdx + 1) % 4];

    const updatedState = {
      dice: newDice,
      positions: newPositions,
      turn: nextTurn,
    };

    set(ref(database, 'games/room1'), updatedState);
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>React Ludo Game</h1>
      <div style={{ margin: '15px 0', fontSize: '1.2rem', fontWeight: 'bold' }}>
        Current Turn: <span style={{ color: gameState.turn }}>{gameState.turn}</span>
      </div>
      <div style={{ fontSize: '1.5rem', margin: '10px' }}>
        🎲 Dice: {gameState.dice}
      </div>
      <button 
        onClick={rollDice} 
        style={{
          padding: '10px 20px', 
          backgroundColor: '#4CAF50', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        Roll & Move
      </button>
      <div style={{ marginTop: '20px' }}>
        <h3>Player Positions:</h3>
        <ul>
          {Object.entries(gameState.positions).map(([color, pos]) => (
            <li key={color}>
              <strong style={{ color }}>{color}</strong>: Position {pos}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
