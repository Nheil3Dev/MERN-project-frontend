import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { AxiosResponse } from 'axios'
import { FormikProps, FormikValues, withFormik } from 'formik'
import { addKata } from '../../services/katasService'
import { KataLevel } from '../../utils/types/Katas.type'
import { kataSchema } from '../../utils/validations/validationsSchemas'
import { NewEditor } from '../editor/NewEditor'

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

// TODO: Poner una alerta cuando no introduces bien las credenciales

function KataFormMaterial (props: FormikProps<FormikValues>) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit
  } = props

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography component="h1" variant="h5">
            Add new kata
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
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description ? errors.description : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="level">Level</InputLabel>
                  <Select
                    labelId="level-select-label"
                    id="level"
                    name='level'
                    value={values.level}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={KataLevel.BASIC}>{KataLevel.BASIC}</MenuItem>
                    <MenuItem value={KataLevel.MEDIUM}>{KataLevel.MEDIUM}</MenuItem>
                    <MenuItem value={KataLevel.HIGH}>{KataLevel.HIGH}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="creator"
                  label="Creator"
                  type="creator"
                  id="creator"
                  autoComplete="new-creator"
                  value={values.creator}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.creator && Boolean(errors.creator)}
                  helperText={touched.creator ? errors.creator : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="solution"
                  label="Solution"
                  id="solution"
                  autoComplete="new-solution"
                  value={values.solution}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.solution && Boolean(errors.solution)}
                  helperText={touched.solution ? errors.solution : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="code"
                  label="code"
                  id="code"
                  autoComplete="new-code"
                  value={values.code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.code && Boolean(errors.code)}
                  helperText={touched.code ? errors.code : ''}
                >
                </TextField>
                  <NewEditor setCodeText={handleChange} />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export const KataForm = withFormik({
  mapPropsToValues: () => ({
    name: '',
    description: '',
    level: KataLevel.BASIC,
    creator: '',
    solution: '',
    code: ''
  }),
  validationSchema: kataSchema,
  handleSubmit: async (values) => {
    const token = sessionStorage.getItem('sessionToken') ?? ''
    const kata = {
      name: values.name,
      description: values.description,
      level: values.level,
      creator: values.creator,
      solution: values.solution
    }
    addKata(token, kata)
      .then((response: AxiosResponse) => {
        console.log(response.status)
        if (response.status === 201) {
          console.log(response.status)
        } else {
          throw new Error('Error in server')
        }
      })
      .catch(err => console.error(`[REGISTER ERROR]: Somethig went wrong -> ${err.message}`))
  }
})(KataFormMaterial)
