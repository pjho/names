import { h, Component } from "preact";
import { Router } from "preact-router";
import _mapValues from 'lodash-es/mapValues'

import Header from "./header";
import Home from "../routes/home";
import Name from "../routes/name";

import Profile from "../routes/profile";
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

if (module.hot) {
  require("preact/debug");
}


import { allYears } from "../utils/allyears";


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

        const data = {
          ...json,
          female: _mapValues(json.female, (v) => ({ ...v, years: { ...allYears, ...v.years } })),
          male: _mapValues(json.male, (v) => ({ ...v, years: { ...allYears, ...v.years } })),
        }

        window.data = data;

        this.setState({ data, loading: false });
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
