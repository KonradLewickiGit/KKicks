import React, { useState, useEffect } from 'react';
// import { Order } from 'assets/types'
import Button from '../../components/atoms/Button/Button'
import { useAuth } from '../../hooks/useApi'
import Address from '../../components/organism/Address/AddressList';

import { Field, Wrapper, FieldsContainer } from './Profile.styles'

const Profile = () => {
  const { signOut, user } = useAuth();

  return (
    <Wrapper>
      <Field>
      <span>Dane użytkownika</span>
      </Field>
      <FieldsContainer>
      <Field>
        <label>Imie</label>
        <span>{user?.firstName}</span>
      </Field>
      <Field>
        Nazwisko<span>{user?.lastName}</span>
      </Field>
      </FieldsContainer>
      <FieldsContainer>
      <Field>
        Email<span>{user?.email}</span>
      </Field>
      <Field>
        Numer telefonu<span>{user?.phoneNumber}</span>
      </Field>
      </FieldsContainer>
      <Field>
      <span>Adres</span>
      </Field>
      {user && <Address />}
      <Button isbig onClick={signOut}>
        Log out
      </Button>
    </Wrapper>
  )
}

export default Profile