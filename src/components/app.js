import { h, Component } from "preact";
import { Router } from "preact-router";
import { observer } from "mobx-preact";

import { Provider } from "mobx-preact";

import { RootStore } from "../models/RootStore";

import Header from "./header";
import Home from "../routes/home";
import Name from "../routes/name";

import Profile from "../routes/profile";
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

if (module.hot) {
  require("preact/debug");
}

const rootStore = new RootStore()
const stores = {
  nameStore: rootStore.nameStore,
  uiStore: rootStore.uiStore,
  yearStore: rootStore.yearStore,
}

@observer
export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url;
  };


  render() {
    return (
      <Provider { ...stores }>
        <div id="app">
          <Header />
          { rootStore.uiStore.dataLoaded ? (
            <Router onChange={ this.handleRoute }>
              <Home path="/" />
              <Name path="/n/:name" />
              <Profile path="/profile/" user="me" />
              <Profile path="/profile/:user" />
            </Router>
          ) : (
            <p style={{ marginTop: '80px' }}>
              Loading
            </p>
          )}
        </div>
      </Provider>
    );
  }
}
