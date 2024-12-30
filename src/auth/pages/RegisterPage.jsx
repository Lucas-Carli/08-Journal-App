import { Link as RouterLink } from 'react-router-dom';
import { Google } from "@mui/icons-material";
import { Button, Grid, Grid2, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';

export const RegisterPage = () => {
  return (
    /* Implementación color del fondo, desde purpleTheme */
    <AuthLayout title="Create account">
      <form>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Complete Name"
              type="text"
              placeholder="Lucas Carli"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="correo@google.com"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="password"
              fullWidth
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} >
              <Button variant='contained' fullWidth>
                Create Account
              </Button>
            </Grid>

          </Grid>

          <Grid container directon='row' justifyContent='end' >
            <Typography sx={{ mr: 1 }}>¿Ya tiene cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Use your account
            </Link>
          </Grid>



        </Grid>

      </form>


    </AuthLayout>



  )
}
