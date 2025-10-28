import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader, errorHelper } from '../utils/tools'
import { Box, TextField, Button } from '@mui/material'
import { registerUser, signinUser } from '../store/actions/users'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import PreventSignin from '../hoc/preventSignin'

function Auth() {
    const [register, setRegister] = useState(false)
    const users = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const notifications = useSelector((state) => state.notifications)
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: 'amna1234@gmail.com',
            password: 'amna12345'

        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('email is required'),

            password: Yup.string()
                .min(6, 'password must be atleast 6 characters')
                .required('password is required')
        }),
        onSubmit: (values) => {
            handleSubmit(values)
        }
    })

    const handleSubmit = (values) => {
        if (register) {
            dispatch(registerUser(values))
        }
        else {
            dispatch(signinUser(values))
        }

    }

    useEffect(() => {
        if (notifications && notifications.global && notifications.global.success) {
            const message = notifications.global.message ? notifications.global.message : 'Operation successful'
            console.log('Message:', message);

            navigate('/dashboard')
        }

    }, [notifications])
    return (
        <PreventSignin users={users}>
            <div className='auth_container'>
                <h1>authenticate</h1>
                {users.loading ?
                    <Loader />
                    :
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '100%', marginTop: '20px' },
                        }}
                        onSubmit={formik.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={formik.values.email}
                            {...formik.getFieldProps('email')}

                            {...errorHelper(formik, 'email')}
                        >

                        </TextField>
                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={formik.values.password}
                            {...formik.getFieldProps('password')}
                            {...errorHelper(formik, 'password')}

                        ></TextField>

                        <div className='mt-5 '>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={users.loading}
                                size='large'
                                sx={{ width: '100%' }}
                            >
                                {register ? 'Register' : 'Login'}
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                size='large'
                                sx={{ width: '100%', marginTop: '10px' }}
                                onClick={() => setRegister(!register)}
                            >
                                Want to  {!register ? 'Register' : 'Login'}
                            </Button>
                        </div>

                    </Box>

                }

            </div >
        </PreventSignin>
    )
}

export default Auth