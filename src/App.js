import React from "react";

import Home from "./Components/Home";
import Chat from "./Components/Chat";

import { Router, Scene } from "react-native-router-flux";
import { Platform } from "react-native";

global.Symbol = require("core-js/es6/symbol");
require("core-js/fn/symbol/iterator");

// collection fn polyfills
require("core-js/fn/map");
require("core-js/fn/set");
require("core-js/fn/array/find");

class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene
          key="root"
          style={{
            paddingTop: Platform.OS === "ios" ? 64 : 54
          }}
        >
          <Scene key="home" component={Home} title="Home" />
          <Scene key="Chat" component={Chat} title="Chat" />
        </Scene>
      </Router>
    );
  }
}
export default App;
