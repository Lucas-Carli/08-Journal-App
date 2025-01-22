import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Grid2, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailPassword } from '../../store/auth';


/* Declaro los valores iniciales en una constante */
const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'The email must have an @'],
  password: [(value) => value.length >= 6, 'Password must have more than 6 letters'],
  displayName: [(value) => value.length >= 1, 'The name is required'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const
    { formState, displayName, email, password, onInputChange,
      isFormValid, displayNameValid, emailValid, passwordValid,
    } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  }

  return (
    /* Implementación color del fondo, desde purpleTheme */
    <AuthLayout title="Create account">
      <h1>FormValid {isFormValid ? 'Valid' : 'Incorrect'}</h1>

      <form onSubmit={onSubmit} >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Complete Name"
              type="text"
              placeholder="Complete name"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="password"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid
              item
              xs={12}
              display={!!errorMessage ? '' : 'none'}
            >
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12} >
              <Button
                disabled={isCheckingAuthentication}
                type="submit"
                variant='contained'
                fullWidth>
                Create Account
              </Button>
            </Grid>

          </Grid>

          <Grid container directon='row' justifyContent='end' >
            <Typography sx={{ mr: 1 }}>¿Already have an account?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Use your account
            </Link>
          </Grid>



        </Grid>

      </form>


    </AuthLayout>



  )
}
