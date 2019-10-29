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
 * @param {string} props.emailValue fill email form with a value
 * @param {string} props.passwordValue fill password form with a value
 * @param {string} props.emailError error message for invalid email
 * @param {string} props.passwordError error message for invalid password
 * @param {string} props.generalError general error message if something went wrong
 * @param {function} props.emailOnChange callback function for when email gets changed (usually to clear error messages)
 * @param {function} props.passwordOnChange callback function for when password gets changed (usually to clear error messages)
 */
export default function Map(props) {
  const classes = useStyles();

  return (
    <>
      <Dialog open={true} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>

        <DialogContent>
          {props.generalError && <DialogContentText className={classes.error}>{props.generalError}</DialogContentText>}
          <FormControl error={props.emailError ? true : false}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              type="email"
              value={props.emailValue}
              onChange={props.emailOnChange}
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
              onChange={props.passwordOnChange}
              aria-describedby="password-error-text"
            />
            {props.passwordError && <FormHelperText id="password-error-text">{props.passwordError}</FormHelperText>}
          </FormControl>
        </DialogContent>

        <DialogActions className={classes.root}>
          <Button className={classes.root}>
            Cancel
          </Button>
          <Button className={classes.root}>
            Login
          </Button>
        </DialogActions>

      </Dialog>
    </>
  )
}