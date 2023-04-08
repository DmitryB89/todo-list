import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {SubmitHandler, useForm} from "react-hook-form";
import {authAPI} from "../../api/todolists-api";
import {loginTC} from "../TodolistsList/auth-reducer";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {Navigate} from "react-router-dom";

// type FormikErrorType = {
//   email?: string
//   password?: string
//   rememberMe?: boolean
// }

type FormInputType = {
  email:string
  password:string
  rememberMe?:boolean
  captcha?:boolean
}
export const Login = () => {

  const dispatch = useAppDispatch()
  const { register, handleSubmit, formState:{errors, isValid},reset } = useForm<FormInputType>({mode:'onBlur'});
  const onSubmit: SubmitHandler<FormInputType> = data => {
    dispatch(loginTC(data))
    reset()
  }
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  if (isLoggedIn) {
    return <Navigate to={'/'}/>
  }
  // const formik = useFormik({
  //   initialValues: {
  //     email: '',
  //     password: '',
  //     rememberMe: false
  //   },
  //   validate: (values) => {
  //     const errors: FormikErrorType = {}
  //     if (!values.email) {
  //       errors.email = 'Email required'
  //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //       errors.email = 'Invalid email address'
  //     } else if (!values.password) {
  //       errors.password = 'Password required'
  //     } else if (values.password.length > 8) {
  //       errors.password = 'Password should be less than 8 symbols'
  //     } else if (values.password.length <= 3)
  //       errors.password = 'The password is too short'
  //
  //     return errors
  //   },
  //   onSubmit: values => {
  //     alert(JSON.stringify(values));
  //   },
  // })
  return <Grid container justifyContent={'center'}>
    <Grid item justifyContent={'center'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>
            <p>Get registered to log in
              <a href={'https://social-network.samuraijs.com/'}
                 target={'_blank'}> here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
          <FormGroup>
            <TextField label="Email" margin="normal" {...register("email", { required: 'Обязательно к заполнению', pattern: {value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,message:'Неверный адрес почты'}})}/>
            {errors?.email && <p>{errors.email.message}</p>}

            <TextField type="password" label="Password"
                       margin="normal" {...register("password", { required: 'Обязательно к заполнению', maxLength: {value:15, message:'не более 15 символов'}, minLength:{value:5, message:'не менее 5 символов'} })}
            />
            {errors?.password && <p>{errors.password.message}</p>}


            <FormControlLabel label={'Remember me'}
                              control={<Checkbox {...register("rememberMe")}/>}/>
            <Button type={'submit'} variant={'contained'} color={'primary'} disabled={!isValid}>
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  </Grid>
}