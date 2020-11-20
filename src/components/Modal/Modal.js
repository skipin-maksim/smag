import React, { Component } from 'react';
import { connect } from 'react-redux';
import { modalActions } from '../../redux/modal/';

class Modal extends Component {
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
    console.log(this.props.children);
    return (
      <div className="Overlay" onClick={this.handleMouseClick}>
        <div className="Modal">{this.props.children}</div>
      </div>
    );
  }
}

const mDTP = {
  onCloseModal: modalActions.closeModal,
};

export default connect(null, mDTP)(Modal);
