import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Content from "./components/content";
import Header from "./components/header";
import Navbar from "./components/navbar";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Navbar />
        <Content />
      </div>
    );
  }
}

export default App;
