import React, { useState, useEffect } from 'react';
// import { Order } from 'assets/types'
import Button from '../../components/atoms/Button/Button'
import { useAuth } from '../../hooks/useApi'
import Address from '../../components/organism/Address/AddressList';

import { Field, Wrapper, FieldsContainer } from './Profile.styles'
import OrderHistory from '../../components/organism/OrderHistory/OrderHistory';
import SellHistory from '../../components/organism/SellHistory/SellHistory';

const Profile = () => {
  const { signOut, user } = useAuth();

  return (
    <Wrapper>
      <Field>
      <span>Dane użytkownika</span>
      </Field>
      <FieldsContainer>
      <Field>
        Imie<span>{user?.firstName}</span>
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
      {user && <OrderHistory />}
      {user && <SellHistory />}
      <Button isbig onClick={signOut}>
        Log out
      </Button>
    </Wrapper>
  )
}

export default Profile