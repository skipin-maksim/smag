import React, { Component } from 'react';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = ({ code }) => {
    if (code === 'Escape') this.props.onCloseModal();
  };

  handleMouseClick = ({ target }) => {
    if (target.className === 'Overlay') this.props.onCloseModal();
  };

  render() {
    return (
      <div className="Overlay" onClick={this.handleMouseClick}>
        <div className="Modal">{this.props.children}</div>
      </div>
    );
  }
}
