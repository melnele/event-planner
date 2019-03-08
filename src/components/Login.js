import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/actions/auth';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  updatePassword(value) {
    this.setState({
      password: value,
    });
  }

  updateUsername(value) {
    this.setState({
      username: value,
    });
  }

  signin() {
    this.props.login(this.state.username, this.state.password);
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <form style={{ textAlign: "center", justifyContent: "center", margin: "auto" }}>
        <h1>Sign In</h1>
        <input
          type="text" placeholder="Username"
          onChange={(event) => { this.updateUsername(event.target.value) }}
          value={this.state.username}
        />
        <br></br>
        <input
          type="password" placeholder="Password"
          password={this.state.password}
          onChange={(event) => { this.updatePassword(event.target.value) }}
        />
        <br></br>
        <br></br>
        <input className="btn btn-info" type="button" value="Sign In" onClick={() => { this.signin() }} />
      </form>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);