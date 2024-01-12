import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import registerSchema from '../../assets/schemas/registerSchema'
import { RegisterData } from '../../assets/types'
import Button from '../../components/atoms/Button/Button'
import FormField from '../../components/molecules/formField/FormField'
import { useAuth } from '../../hooks/useApi'

import { Wrapper } from './Register.styles'

const Register: React.FC = () => {
  const { error, signUp } = useAuth()

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm<RegisterData>({ resolver: yupResolver(registerSchema) 
  })

  const onSubmit: SubmitHandler<RegisterData> = (data) => {
    signUp(data);
  }

  return (
    <Wrapper action="post" onSubmit={handleFormSubmit(onSubmit)}>
      <h1>Zarejestruj się</h1>
      <FormField
        id="login"
        labelText="login"
        type={'login'}
        placeholder={'login'}
        {...register('login')}
        error={errors.login?.message}
        required
      />
      <FormField
        id="password"
        labelText="Password"
        type={'password'}
        {...register('password')}
        placeholder={'hasło123'}
        error={errors.password?.message}
        required
      />
      <FormField
        id="email"
        labelText="E-mail"
        type={'email'}
        placeholder={'Email@email.com'}
        {...register('email')}
        error={errors.email?.message}
        required
      />
      <FormField
        id="firstName"
        labelText="Imie"
        type={'firstName'}
        placeholder={'Marek'}
        {...register('firstName')}
        error={errors.firstName?.message}
        required
      />
      <FormField
        id="lastName"
        labelText="Nazwisko"
        type={'lastName'}
        placeholder={'Kowalski'}
        {...register('lastName')}
        error={errors.lastName?.message}
        required
      />
      <FormField
        id="phoneNumber"
        labelText="Numer telefonu"
        type={'phoneNumber'}
        {...register('phoneNumber')}
        placeholder={'000000000'}
        error={errors.phoneNumber?.message}
        required
      />
      {error && <span>{error}</span>}
      <Button isbig type="submit">
        Sign up
      </Button>
      <span>Masz konto?</span>
      <Link to="/login">
        <b>Zaloguj się</b>
      </Link>
    </Wrapper>
  )
}

export default Register;
