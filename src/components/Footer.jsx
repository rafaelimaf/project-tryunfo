import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <div className="container-fluid bg-light py-3">
        <footer
          className="d-flex flex-wrap justify-content-between
        align-items-center py-3 my-4 border-top"
        >
          <div className="col-md-4 d-flex align-items-center">
            <span className="text-muted">© 2022 Rafael de Lima</span>
          </div>
        </footer>
      </div>
    );
  }
}
