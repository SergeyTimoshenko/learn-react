import React from 'react';
import './App.css';
import Header from './header/Header';
import ToDos from './todos/ToDos';

function App() {
  return (
    <div className="App">
      <Header name={'ToDos'}></Header>
      <ToDos></ToDos>
    </div>
  );
}

export default App;
