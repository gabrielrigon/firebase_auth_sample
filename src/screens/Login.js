import { Button, Divider, Grid, Paper, Snackbar, TextField, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const styles = {
  userInfo: {
    margin: 0,
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
  },
  papers: {
    padding: 24,
  },
  buttons: {
    marginTop: 25,
    marginRight: 15
  },
  dividers: {
    marginTop: 25
  }
};

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      logged: false,
      name: '',
      open: false,
      password: '',
      snackMessage: '',
      user: null
    }
  }

  // lifecycle methods

  componentDidMount() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      this.setState({
        user: firebaseUser,
        name: firebaseUser && firebaseUser.displayName ? firebaseUser.displayName : '',
        logged: !!firebaseUser
      })
    })
  }

  // events methods

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  // firebase methods

  signInClicked = () => {
    const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(
      email,
      password
    )
      .catch(e => {
        this.showSnackbar(e.code)
      });
  }

  signUpClicked = () => {
    const { email, password } = this.state;

    firebase.auth().createUserWithEmailAndPassword(
      email,
      password
    )
      .then(() => {
        const user = firebase.auth().currentUser;

        user.sendEmailVerification()
          .then(() => {
            this.showSnackbar('email-verification-sent')
          })
          .catch(e => {
            this.showSnackbar(e.code)
          })
      })
      .catch(e => {
        this.showSnackbar(e.code)
      });
  }

  signOutClicked = () => {
    firebase.auth().signOut()
      .catch(e => {
        this.showSnackbar(e.code)
      });
  }

  updateUserClicked = () => {
    const { name } = this.state;
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    })
      .then(() => {
        const firebaseUser = firebase.auth().currentUser;

        this.setState({
          user: firebaseUser,
          name: firebaseUser.displayName
        })

      })
      .catch(e => {
        this.showSnackbar(e.code)
      })
  }

  resetPasswordClicked = () => {
    const { email } = this.state;

    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        this.showSnackbar('reset-password-sent')
      })
      .catch(e => {
        this.showSnackbar(e.code)
      })
  }

  // snackbar methods

  showSnackbar = message => {
    this.setState({
      snackMessage: message
    })

    this.setState({
      open: true
    })
  }

  handleSBClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({
      open: false
    })
  }

  // render

  render() {
    const { classes } = this.props;
    const { logged, open, user, email, password, name, snackMessage } = this.state;
    const horizontal = 'center';
    const vertical = 'top';

    return (
      <div className='Login'>
        <Grid container spacing={24} className={classes.papers}>
          <Grid item xs={12} md={4}>
            <Paper className={classes.papers}>
              <Typography variant='title' gutterBottom >
                Firebase Authentication
              </Typography>
                { logged ? (
                  <form>
                    <TextField
                      id='name'
                      label='Nome'
                      margin='normal'
                      fullWidth
                      value={name}
                      onChange={this.handleChange}
                    />

                    <Button
                      variant='raised'
                      color='primary'
                      className={classes.buttons}
                      onClick={this.updateUserClicked}
                    >
                      Atualizar
                    </Button>

                    <Button
                      variant='raised'
                      color='secondary'
                      className={classes.buttons}
                      onClick={this.signOutClicked}
                    >
                      Sair
                    </Button>
                  </form>
                ) : (
                  <form>
                    <TextField
                      id='email'
                      label='E-mail'
                      margin='normal'
                      fullWidth
                      value={email}
                      onChange={this.handleChange}
                    />

                    <TextField
                      id='password'
                      label='Senha'
                      type='password'
                      margin='normal'
                      fullWidth
                      value={password}
                      onChange={this.handleChange}
                    />

                    <Button
                      variant='raised'
                      color='primary'
                      className={classes.buttons}
                      onClick={this.signInClicked}
                    >
                      Entrar
                    </Button>

                    <Button
                      color='primary'
                      className={classes.buttons}
                      onClick={this.signUpClicked}
                    >
                      Cadastrar
                    </Button>

                    <Divider className={classes.dividers} />

                    <Button
                      variant='raised'
                      color='secondary'
                      className={classes.buttons}
                      onClick={this.resetPasswordClicked}
                    >
                      Recuperar senha
                    </Button>
                  </form>
                ) }
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper style={{ padding: 20 }}>
              <pre className={classes.userInfo}>
                { JSON.stringify(user, null, 2) }
              </pre>
            </Paper>
          </Grid>
        </Grid>

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={4000}
          onClose={this.handleSBClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{snackMessage}</span>}
        />
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
