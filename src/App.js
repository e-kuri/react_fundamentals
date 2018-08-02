import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let model = {
  running: false,
  time: 65
}

const view = (model) => {
  const minutes = Math.floor(model.time / 60);
  const seconds = model.time - (minutes * 60);
  let secondsFormatted = `${seconds < 10 ? '0' : ''}${seconds}`
  return <div>{minutes}:{secondsFormatted}</div>
};

//all possible  
let intents = {
  TICK: 'TICK',
  START: 'START',
  STOP: 'STOP',
  RESET: 'RESET'
};
/*
setInterval(() => {
  model = update(model, 'TICK');
  render();
}, 1000);

const render = () => {
  ReactDOM.render(view(model), document.getElementById('root'));
};
*/
class App extends Component {

  render() {
    return (
      view(model)
      /*
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
      */
    );
  }
}

export default App;
