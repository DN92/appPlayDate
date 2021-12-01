import React, { useState } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../../store/chat';

class NewMessage extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const message = event.target.content.value;
    this.props.submitMessage({
      content: message,
      channelId: this.props.channelId,
    });
  }

  render() {
    return (
      <form id='new-message-form' onSubmit={this.handleSubmit}>
        <div className='input-group input-group-lg'>
          <input
            className='form-control'
            type='text'
            name='content'
            placeholder='Say something nice...'
          />
          <span className='input-group-btn'>
            <button className='btn btn-default' type='submit'>
              Chat!
            </button>
          </span>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitMessage: (message) => dispatch(sendMessage(message)),
  };
};

export default connect(null, mapDispatchToProps)(NewMessage);
