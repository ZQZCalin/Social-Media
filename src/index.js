import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { renderIntoDocument } from 'react-dom/test-utils';


// test functions
class Test extends React.Component {
  constructor(props) {
    super (props);
    this.value = "Hello World!";
    this.call = this.call.bind(this);
  }

  call() {
    console.log(this.value);
  }

  render() {
    return (
      <Comp func={this.call}/>
    );
  }
}

function Comp(prop) {
  prop.func();
  return null;
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();