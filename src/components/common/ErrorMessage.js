import React from 'react';

const ErrorMessage = ({ message }) => (
  <div className="error-message" role="alert">
    <i className="fas fa-exclamation-circle" aria-hidden="true" />
    <span>{message}</span>
  </div>
);

export default ErrorMessage;
