import React, { useState, useEffect } from 'react';
// import { Order } from 'assets/types'
import FormField from '../../components/molecules/formField/FormField'
import Button from '../../components/atoms/Button/Button'
import { useAuth } from '../../hooks/useApi'
import { Address } from '../../assets/types';
import { fetchAddressByUserId, addAddressForUser } from '../../api/apiService';

import { Field, Wrapper, FieldsContainer } from './Profile.styles'

const Profile = () => {
  const { signOut, user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [address, setAddress] = useState<Address>({
    city: '',
    zipCode: '',
    street: '',
    buildingNumber: '',
    apartmentNumber: ''
  });
  useEffect(() => {
    if (user) {
      fetchAddressByUserId(user.id)
        .then(data => {
          if (data) setAddress(data);
        })
        .catch(console.error);
    }
  }, [user]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  const handleAddressSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      try {
        const response = await addAddressForUser(user.id, address);
        setEditMode(false);
        console.log('Address added successfully:', response);
      } catch (error) {
        console.error('Error adding address for user in:', error);
      }
    }
  }

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
     {!editMode ? (
        <>
        <Button isbig onClick={() => setEditMode(true)}>Edytuj Adres</Button>
        <Field>
        <span>Adres</span>
        </Field>
        <FieldsContainer>
          <Field>
            <label>Ulica: </label>
            <span>{address.street ? address.street : '-'}</span>
          </Field>
          <Field>
            <label>Miasto: </label>
            <span>{address.city ? address.city : '-'}</span>
          </Field>
          <Field>
            <label>Kod pocztowy: </label>
            <span>{address.zipCode ? address.zipCode : '-'}</span>
          </Field>
        </FieldsContainer>
        <FieldsContainer>
          <Field>
            <label>Numer budynku: </label>
            <span>{address.buildingNumber ? address.buildingNumber : '-'}</span>
          </Field>
          <Field>
          <label>Numer mieszkania: </label>
          <span>{address.apartmentNumber ? address.apartmentNumber : '-'}</span>
        </Field>
        </FieldsContainer>
      </>

      ) : (
        <form onSubmit={handleAddressSubmit}>
          <FormField
            id="city"
            labelText="Miasto"
            type="text"
            name="city"
            value={address.city}
            onChange={handleAddressChange}
          />
          <FormField
            id="zipCode"
            labelText="Kod pocztowy"
            type="text"
            name="zipCode"
            value={address.zipCode}
            onChange={handleAddressChange}
          />
          <FormField
            id="street"
            labelText="Ulica"
            type="text"
            name="street"
            value={address.street}
            onChange={handleAddressChange}
          />
          <FormField
            id="buildingNumber"
            labelText="Numer budynku"
            type="text"
            name="buildingNumber"
            value={address.buildingNumber}
            onChange={handleAddressChange}
          />
          <FormField
            id="apartmentNumber"
            labelText="Numer mieszkania"
            type="text"
            name="apartmentNumber"
            value={address.apartmentNumber}
            onChange={handleAddressChange}
          />
          <Button isbig type="submit">Zapisz Adres</Button>
        </form>
      )}
      <Button isbig onClick={signOut}>
        Log out
      </Button>
    </Wrapper>
  )
}

export default Profile