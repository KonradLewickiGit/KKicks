import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useApi';
import { fetchAddressByUserId, addAddressForUser } from '../../../api/apiService';
import { Adres } from '../../../assets/types';
import FormField from '../../molecules/formField/FormField';
import Button from '../../atoms/Button/Button';
import { ProfileSection,
  ProfileField,
  Label,
  ProfileValue,
  ButtonContainer, } from '../../../pages/profile/Profile.styles';
import { FieldsContainer } from './AddresList.styles';


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
          <ProfileField>
            <Label>Miasto:</Label>
            <ProfileValue>{address.city}</ProfileValue>
          </ProfileField>
          <ProfileField>
            <Label>Ulica:</Label>
            <ProfileValue>{address.street}</ProfileValue>
          </ProfileField>
          <ProfileField>
            <Label>Nr budynku:</Label>
            <ProfileValue>{address.buildingNumber}</ProfileValue>
          </ProfileField>
          <ProfileField>
            <Label>Nr mieszkania:</Label>
            <ProfileValue>
              {address.apartmentNumber ? ` m. ${address.apartmentNumber},` : ''}
            </ProfileValue>
          </ProfileField>
          <ProfileField>
            <Label>Kod pocztowy:</Label>
            <ProfileValue>
              {address.zipCode} {address.city}
            </ProfileValue>
          </ProfileField>
          <ButtonContainer>
            <Button type="button" onClick={handleEdit}>
              Edytuj Adres
            </Button>
          </ButtonContainer>
        </div>
      ) : isEditing ? (
        <FieldsContainer>
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
          <ButtonContainer>
            <Button type="button" onClick={handleSave}>
              Zapisz
            </Button>
          </ButtonContainer>
        </FieldsContainer>
      ) : (
        <div>
          <span>Nie masz zapisanego adresu</span>
          <ButtonContainer>
            <Button type="button" onClick={handleEdit}>
              Dodaj Adres
            </Button>
          </ButtonContainer>
        </div>
      )}
    </div>
  );
};
    
    export default Address;