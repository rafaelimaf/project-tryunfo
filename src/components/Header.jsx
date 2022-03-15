import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <header>
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-dark container-fluid
        align-items-center"
        >
          <a className="navbar-brand p-2" href="/">
            <h2 className="h2">
              Tryunfo
            </h2>
          </a>
          <p className="text-muted my-1">by Rafael de Lima</p>
          <ul className="ml-auto navbar-nav">
            <li className="nav-item">
              <a
                href="https://github.com/rafaelimaf"
                target="_blank"
                rel="noreferrer"
                className="nav-link text-primary"
              >
                Github
              </a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
