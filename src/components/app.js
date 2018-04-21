import { h, Component } from "preact";
import { Router } from "preact-router";

import Header from "./header";
import Home from "../routes/home";
import Name from "../routes/name";

import Profile from "../routes/profile";
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

if (module.hot) {
  require("preact/debug");
}

export default class App extends Component {
  state = {
    loading: true,
    data: {}
  };

  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  componentWillMount() {
    fetch("/assets/data/baby-names.json")
      .then(resp => resp.json())
      .then(json => {
        this.setState({ data: json, loading: false });
      });
  }

  render(props, { data, loading }) {
    return (
      <div id="app">
        <Header />
        { loading ? (
          <p>Loading</p>
        ) : (
          <Router onChange={ this.handleRoute }>
            <Home path="/" data={data} thing="it" />
            <Name path="/n/:name" data={data} />
            <Profile path="/profile/" user="me" />
            <Profile path="/profile/:user" />
          </Router>
        )}
      </div>
    );
  }
}
