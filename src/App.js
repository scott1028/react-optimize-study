import React, { Component, PureComponent } from 'react';
import logo from './logo.svg';
import './App.css';


// will re-render when parent re-rendered, whatever current view is equal to upcoming update-view or not. (bad performance, always re-render when parent re-render)
class A extends Component {
  render() {
    console.log('Component-A', this.props.title);
    return (
      <div>{ this.props.value } A</div>
    )
  }
}

// will no re-render when parent re-rendered, when update-coming view equal current view. (good performance) 
class B extends PureComponent {
  render() {
    console.log('PureCompoent-B', this.props.title);
    return (
      <div>{ this.props.value } B</div>
    )
  }
}

class Button extends PureComponent {
  render() {
    console.log('PureComponent_Button', this.props.title);
    return (
      <button onClick={this.props.onClick}>Button</button>
    )
  }
}

class Button2 extends Component {
  render() {
    console.log('Component_Button2', this.props.title);
    return (
      <button onClick={this.props.onClick}>Button2</button>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.setState(prevState => ({ value: prevState.value }))
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          {/*
            Never re-render whatever parent re-renders.
          */}
          <Button onClick={this.onClick} title="Button-1 with pure reference props" />
          {/*
            Button-2 will be re-render whatevery the upcoming view of Button is equal with current view, because you set a declaration "() => {}" as a prop!!
          */}
          <Button onClick={() => this.onClick()} title="Button-2 with inline declaration props" />
          {/*
            Always re-render when parent re-render, because this extends React.Component.
          */}
          <Button2 onClick={this.onClick} title="Button2-1 with pure reference props" />
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload. { this.state.value }
        </p>
        {/*
          If you put a declaration here as passing a props to child, it will always make child-component re-render, whatever you use a React.PureComponent or a React.Component.
        */}
        <A value={[this.state.value]} title="A-1 with inline declaration props" />
        {/*
          Pure value will not cause performance issue, when you use React.PureComponent.
        */}
        <B value={this.state.value} title="B-1 with pure value props" />
      </div>
    );
  }
}

export default App;
