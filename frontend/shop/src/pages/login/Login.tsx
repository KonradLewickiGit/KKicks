import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import loginSchema from '../../assets/schemas/loginSchema'
import { LoginData } from '../../assets/types'
import Button from '../../components/atoms/Button/Button'
import FormField from '../../components/molecules/formField/FormField'
import { useAuth } from '../../hooks/useApi'

import { Wrapper } from './Login.styles'

const Login: React.FC = () => {
  const { signIn, error } = useAuth()
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm<LoginData>({ resolver: yupResolver(loginSchema) })

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    signIn(data)
  }

  return (
    <Wrapper action="post" onSubmit={handleFormSubmit(onSubmit)}>
      <h1>Zaloguj się</h1>
      <FormField
        id="email"
        labelText="email"
        type={'email'}
        placeholder={'email'}
        {...register('email')}
       error={errors.email?.message}
        required
      />
      <FormField
        id="password"
        labelText="Password"
        type={'password'}
        placeholder={'Password'}
         {...register('password')}
        error={errors.password?.message}
        required
      />
      {error && <span>{error}</span>}
      <Button isbig type="submit">
        Log in
      </Button>
      <span>Nie masz konta?</span>
      <Link to="/register">
        <b>Zarejestruj się</b>
      </Link>
    </Wrapper>
  )
}

export default Login;
