import React from 'react';
import ReactDOM from 'react-dom';

 /**
  * MODEL-VIEW-INTENT
  * --> MODEL -> VIEW -> UI ->INTENT -->
  * MODEL: 
  *   - Holds the state of the UI. 
  *   - Unique source of truth.
  *   - Can only be changed by processing intents on the model.
  *   - Holds all possible states.
  * VIEW: 
  *   - Transforms model into UI.
  *   - Returns a UI based on the model.
  * INTENT:
  *   - User's or environment actions (events).
  *   - Holds all the possible transitions.
  */

/**
 * STATE CONTAINER: Component that holds the model and controls updates over that model.
 * getState(): obtains the current application state object held by the state container.
 * dispatch(): applies an intent to the current application state, producing a new application state.
 * suscribe(): registers a callback to be called when the application state changes (an intent is passed to the dispatch method)
 */

////////////// STATE CONTAINER IMPLEMENTATION ////////////////

const createStateConteiner = (reducer) => {
  let internalState;
  const handlers = [];
  return{
    dispatch: (intent) => {
      internalState = reducer(internalState, intent);
      handlers.forEach(h => {h();});
    },
    subscribe: (handler) => {
      handlers.push(handler);
      console.log(handlers);
    },
    getState: () => internalState
  };
};

const update = (model = {running: false, time :0}, intent) => {
  const updates = {
      [intents.TICK]: (model) => Object.assign(model, {time: model.running ? model.time + 1 : model.time}),
      [intents.START]: (model) => Object.assign(model, {running: true}),
      [intents.STOP]: (model) => Object.assign(model, {running: false}),
      [intents.RESET]: (model) => Object.assign(model, {time: 0}),
  };
  return ( updates[intent] || (() => model))(model);
};

const container = createStateConteiner(update);


////////////////////////////////////////////////////////////

/*
We don't need to hold the model in our component anymore
let model = {
  running: true,
  time: 0
}
*/

const view = (model) => {
  const minutes = Math.floor(model.time / 60);
  const seconds = model.time - (minutes * 60);
  const secondsFormatted = `${seconds < 10 ? '0' : ''}${seconds}`
  const handler = (event) => {
     // model = update(model, model.running ? intents.STOP : intents.START);
     container.dispatch( model.running ? intents.STOP : intents.START);
  };
  const resetHandler = (event) => {
    //model = update(model, intents.RESET)
    container.dispatch(intents.RESET);
  };
  return <div>
      <p>{minutes}:{secondsFormatted}</p>
      <button onClick={handler}>{model.running ? intents.STOP : intents.START}</button>
      <button onClick={resetHandler}>{intents.RESET}</button>
    </div>;
};

//all possible events
let intents = {
  TICK: 'TICK',
  START: 'START',
  STOP: 'STOP',
  RESET: 'RESET'
};

setInterval(() => {
  /*
  update(model, intents.TICK);
  render();*/
  container.dispatch(intents.TICK);
}, 1000);

const render = () => {
 // ReactDOM.render(view(model), document.getElementById('root'));
  ReactDOM.render(view(container.getState()), 
    document.getElementById('root')
  );
};
container.subscribe(render);