import React from 'react';

const Messages = (props) => {
  let messages;

  if (props.messages.success) {
    messages = (
      <div role="alert" className="alert alert-success">
        {props.messages.success.map((message, index) => <div key={index}>{message.msg}</div>)}
      </div>
    );
  } else if (props.messages.error) {
    messages = (
      <div role="alert" className="alert alert-danger">
        {props.messages.error.map((message, index) => <div key={index}>{message.msg}</div>)}
      </div>
    );
  } else if (props.messages.info) {
    messages = (
      <div role="alert" className="alert alert-info">
        {props.messages.info.map((message, index) => <div key={index}>{message.msg}</div>)}
      </div>
    );
  } else {
    messages = <div></div>;
  }

  return messages;
};

export default Messages;
