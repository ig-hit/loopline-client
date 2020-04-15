import React from 'react';
import './Register.css';
import Main from "../layouts/Main";
import {RootState} from 'MyTypes';
import {connect} from "react-redux";

const mapStateToProps = (state: RootState) => {
  console.log('register:', state.notebooks.user);
  return {
    token: state.notebooks.user.token,
    registered: !!state.notebooks.user.token,
  }
};

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: string; }) => void) => {
  return {
    getToken: (name: string) => dispatch({type: 'REGISTER_REQUEST', payload: name}),
  }
};

interface State {
  token: string;
}

type Props = ReturnType<typeof mapDispatchToProps> & State;

class Register extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      token: '',
    }

  }

  render() {
    const {getToken, token} = this.props;
    if (token) {
      window.location.pathname = '/';
      return '';
    }

    return (
      <Main>
        <h1>Welcome to notebook app, Guest!</h1>
        <div id="register">
          <form className="form-signin" onSubmit={(event: React.FormEvent) => {
            event.preventDefault();
            getToken((document.getElementById('name') as HTMLInputElement).value);

          }}>
            <h1 className="h3 mb-3 font-weight-normal">Please register</h1>
            <label htmlFor="inputEmail" className="sr-only">Your Name</label>
            <input type="text" id="name" className="form-control" placeholder="Name" required autoFocus/>
            <div className="checkbox mb-3"/>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
          </form>
        </div>
      </Main>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
