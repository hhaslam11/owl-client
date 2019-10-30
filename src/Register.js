import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import "./Register.scss"

const useStyles = makeStyles(({
  error: {
    color: 'red'
  }
}));

/**
 * @param {boolean} props.open is the modal visible or not
 * @param {string} props.title title of the modal (default "Create an account")
 * @param {string} props.error general error message if something went wrong
 * @param {string} props.usernameValue fill username form with a value
 * @param {string} props.emailValue fill email form with a value
 * @param {string} props.passwordValue fill password form with a value
 * @param {function} props.usernameOnChange callback function for when username gets changed (value is passed as argument)
 * @param {function} props.emailOnChange callback function for when email gets changed (value is passed as argument)
 * @param {function} props.passwordOnChange callback function for when password gets changed (value is passed as argument)
 * @param {function} props.passwordConfirmOnChange callback function for when password gets changed (value is passed as argument)
 * @param {function} props.onSumbit callback function for when the submit button is clicked
 * @param {function} props.onCancel callback function for when the cancel button is clicked
 */
export default function Register(props) {
  const classes = useStyles();

  return (
    <>
      <Dialog open={props.open} fullWidth={true}>
        <DialogTitle>{props.title || 'Create an account'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                variant="outlined"
                id="email"
                label="Email Address"
                name="email"
                value={props.emailValue}
                onChange={value => props.emailOnChange(value.target.value)}
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="username"
                name="username"
                variant="outlined"
                required
                id="username"
                label="Username"
                value={props.usernameValue}
                onChange={value => props.usernameOnChange(value.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                value={props.passwordValue}
                onChange={value => props.passwordOnChange(value.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                name="passwordConfirm"
                label="Password Confirm"
                type="password"
                id="passwordConfirm"
                onChange={value => props.passwordConfirmOnChange(value.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              {props.error && <DialogContentText className={classes.error}>{props.error}</DialogContentText>}
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onCancel}>
            Cancel
          </Button>
          <Button onClick={props.onSubmit}>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}