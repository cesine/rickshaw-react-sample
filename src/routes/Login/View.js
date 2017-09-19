import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../components/Form';

export default function Login({ requestLogin, history }) {
  return (
    <Form
      onSubmit={fields => requestLogin({
        fields,
        callback: () => {
          history.push('/');
        },
      })}
    />);
}

Login.propTypes = {
  history: PropTypes.shape({}).isRequired,
  requestLogin: PropTypes.func.isRequired,
};
