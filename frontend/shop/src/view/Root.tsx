import React from 'react'

import AuthorizedApp from '../templates/AuthorizedApp/AuthorizedApp'
import UnauthorizedApp from '../templates/UnauthorizedApp/UnauthorizedApp'
import AdminApp from '../templates/AdminApp/AdminApp'
import { useAuth } from '../hooks/useApi'

const Root: React.FC = () => {
  const { user } = useAuth()
  const hasRole = (role: string) => {
    return user?.authorities.some(authority => authority.authority === role);
  };

  console.log("Aktualny stan użytkownika:", user)
  if (user) {
    if (hasRole('ADMIN')) {
      return <AdminApp />;
    } else if (hasRole('USER')) {
      return <AuthorizedApp />;
    }
  }
  
  return <UnauthorizedApp />;
};

export default Root
