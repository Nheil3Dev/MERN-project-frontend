import { Alert, AlertTitle } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { AxiosResponse } from 'axios'
import { FormikProps, FormikValues, withFormik } from 'formik'
import { register } from '../../services/authService'
import { registerSchema } from '../../utils/validations/validationsSchemas'

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

function RegisterFormMaterial (props: FormikProps<FormikValues>) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    status
  } = props
  return (
    <ThemeProvider theme={defaultTheme}>
      {status === 201 && <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        User created successfully. <Link href='/login'><strong>Go to Login!</strong></Link>
      </Alert>}
      {status === 202 && <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This email is already registered.
      </Alert>}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name='name'
                  required
                  fullWidth
                  id='name'
                  label="Name"
                  autoFocus
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name ? errors.name : ''}
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email ? errors.email : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password ? errors.password : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm"
                  label="Confirm Password"
                  type="password"
                  id="confirm"
                  autoComplete="new-password"
                  value={values.confirm}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.confirm && Boolean(errors.confirm)}
                  helperText={touched.confirm ? errors.confirm : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="age"
                  label="Age"
                  type="number"
                  id="age"
                  autoComplete="new-age"
                  value={values.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.age && Boolean(errors.age)}
                  helperText={touched.age ? errors.age : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export const RegisterMaterial = withFormik({
  mapPropsToValues: () => ({
    name: '',
    email: '',
    password: '',
    confirm: '',
    age: ''
  }),
  validationSchema: registerSchema,
  handleSubmit: async (values, { setStatus }) => {
    register(values.name, values.email, values.password, Number(values.age))
      .then((response: AxiosResponse) => {
        console.log(response.status)
        if (response.status === 201) {
          setStatus(response.status)
        } else {
          setStatus(response.status)
          throw new Error('Error in server')
        }
      })
      .catch(err => console.error(`[REGISTER ERROR]: Somethig went wrong -> ${err.message}`))
  }
})(RegisterFormMaterial)
