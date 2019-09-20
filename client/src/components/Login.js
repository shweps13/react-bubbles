import React from "react";
import axiosWithAuth from "../utilites/axiosWithAuth";
import { Container, Header, Button, Form  } from 'semantic-ui-react'

class Login extends React.Component {
  
  state = {
    credentials: {
      username: '',
      password: ''
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };
  
  login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', this.state.credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.payload);
        this.props.history.push('/bubblepage');
      })
      .catch(err => console.log('Oh-oh, something wrong', err));
  };

  
  render() {
  return (
    <Container text>
      <Header as='h2'>Welcome to the Bubble App!</Header>
      <Form onSubmit={this.login}>
        <Form.Field>
        <label>Login</label>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
        <label>Password</label>
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
        </Form.Field>
          <Button type='submit'>Log in</Button>
        </Form>
    </Container>
  );
  }
};

export default Login;
