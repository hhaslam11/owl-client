import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import "./Login.scss"

const useStyles = makeStyles(({
  error: {
    color: 'red'
  }
}));

/**
 * @param {boolean} props.open is the modal visible or not
 * @param {string} props.emailValue fill email form with a value
 * @param {string} props.passwordValue fill password form with a value
 * @param {string} props.emailError error message for invalid email
 * @param {string} props.passwordError error message for invalid password
 * @param {string} props.generalError general error message if something went wrong
 * @param {function} props.emailOnChange callback function for when email gets changed (value is passed as argument)
 * @param {function} props.passwordOnChange callback function for when password gets changed (value is passed as argument)
 * @param {function} props.onSumbit callback function for when the submit button is clicked
 * @param {function} props.onCancel callback function for when the cancel button is clicked
 */
export default function Login(props) {
  const classes = useStyles();

  return (
    <>
      <Dialog open={props.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>

        <DialogContent>
          {props.generalError && <DialogContentText className={classes.error}>{props.generalError}</DialogContentText>}
          <FormControl error={props.emailError ? true : false}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              type="email"
              value={props.emailValue}
              onChange={value => props.emailOnChange(value.target.value)}
              aria-describedby="email-error-text"
            />
            {props.emailError && <FormHelperText id="email-error-text">{props.emailError}</FormHelperText>}
          </FormControl>
          <br/>
          <FormControl error={props.passwordError ? true : false}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type="password"
              value={props.passwordValue}
              onChange={value => props.passwordOnChange(value.target.value)}
              aria-describedby="password-error-text"
            />
            {props.passwordError && <FormHelperText id="password-error-text">{props.passwordError}</FormHelperText>}
          </FormControl>
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