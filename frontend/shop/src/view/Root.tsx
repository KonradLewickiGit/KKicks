import React from 'react'

import AuthorizedApp from '../templates/AuthorizedApp/AuthorizedApp'
import UnauthorizedApp from '../templates/UnauthorizedApp/UnauthorizedApp'
import { useAuth } from '../hooks/useApi'

const Root: React.FC = () => {
  const { user } = useAuth()

  return <>{user ? <AuthorizedApp /> : <UnauthorizedApp />}</>
}

export default Root
