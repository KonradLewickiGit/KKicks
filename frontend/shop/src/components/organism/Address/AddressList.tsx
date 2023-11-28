import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useApi';
import { fetchAddressByUserId, addAddressForUser } from '../../../api/apiService';
import { Adres } from '../../../assets/types';
import FormField from '../../molecules/formField/FormField';
import Button from '../../atoms/Button/Button';
import { Field, FieldsContainer } from '../../../pages/profile/Profile.styles';


const Address = () => {
    const { user } = useAuth();
    const [address, setAddress] = useState<Adres | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedAddress, setEditedAddress] = useState<Adres>({
      city: '',
      zipCode: '',
      street: '',
      buildingNumber: '',
      apartmentNumber: ''
    });

    useEffect(() => {
        // Sprawdzenie, czy 'user' nie jest nullowym przed uzyskaniem dostępu do 'user.id'
        if (user && user.id) {
          fetchAddress(user.id);
        }
      }, [user]);

      const fetchAddress = async (userId: number) => {
        try {
          const fetchedAddress = await fetchAddressByUserId(userId);
          setAddress(fetchedAddress);
          setEditedAddress(fetchedAddress || {
            city: '',
            zipCode: '',
            street: '',
            buildingNumber: '',
            apartmentNumber: ''
          });
        } catch (error) {
          console.error('Error fetching address:', error);
        }
      };

      const handleEdit = () => {
        setIsEditing(true);
      };

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedAddress({ ...editedAddress, [e.target.name]: e.target.value });
    };
    
    
      const handleSave = async () => {
        if (user && user.id) {
            try {
              await addAddressForUser(user.id, editedAddress);
              setAddress(editedAddress);
              setIsEditing(false);
            } catch (error) {
              console.error('Error updating address:', error);
            }
          }
        };
    
      return (
        <div>
          {address && !isEditing ? (
            <div>             
              <FieldsContainer> 
                <Field>
                Miasto: <span> {address.city}</span>
                </Field>
                <Field>
                Ulica: <span> {address.street}</span>
                </Field> 
                <Field>
                 Nr budynku:<span> {address.buildingNumber} </span>
                </Field>
                </FieldsContainer>
                <FieldsContainer>
                <Field>
                Nr mieszkania: <span>{address.apartmentNumber ? ` m. ${address.apartmentNumber},` : ''} </span>
                </Field>
                <Field>
                Kod pocztowy: <span>{address.zipCode} {address.city} </span>
                </Field>
                </FieldsContainer>
              <Button type="button" onClick={handleEdit}>Edytuj Adres</Button>
            </div>
          ) : isEditing ? (
            <div>
            <FormField
              id="street"
              labelText="Ulica"
              type="text"
              placeholder="Ulica"
              value={editedAddress.street}
              onChange={handleChange}
              name="street"
            />
            <FormField
              id="city"
              labelText="Miasto"
              type="text"
              placeholder="Miasto"
              value={editedAddress.city}
              onChange={handleChange}
              name="city"
            />
            <FormField
              id="zipCode"
              labelText="Kod pocztowy"
              type="text"
              placeholder="Kod pocztowy"
              value={editedAddress.zipCode}
              onChange={handleChange}
              name="zipCode"
            />
            <FormField
              id="buildingNumber"
              labelText="Numer budynku"
              type="text"
              placeholder="Numer budynku"
              value={editedAddress.buildingNumber}
              onChange={handleChange}
              name="buildingNumber"
            />
            <FormField
              id="apartmentNumber"
              labelText="Numer mieszkania"
              type="text"
              placeholder="Numer mieszkania"
              value={editedAddress.apartmentNumber}
              onChange={handleChange}
              name="apartmentNumber"
            />
            <Button type="button" onClick={handleSave}>Zapisz</Button>
          </div>
          ) : (
            <div>
              <span>Nie masz zapisanego adresu</span>
              <Button type="button" onClick={handleEdit}>Dodaj Adres</Button>
            </div>
          )}
        </div>
      );
    };
    
    export default Address;