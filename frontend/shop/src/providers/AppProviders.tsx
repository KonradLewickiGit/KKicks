import React, { ReactNode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { ApiProvider } from '../hooks/useApi'
import PropTypes from 'prop-types'

import ThemeAndStylesProvider from './ThemeAndStylesProvider'

interface Props {
  children: ReactNode
}

const AppProviders: React.FC<Props> = ({ children }) => {
  return (

      <Router>
      <ApiProvider>
        <ThemeAndStylesProvider>
          {children}
        </ThemeAndStylesProvider>
        </ApiProvider>
      </Router>
  )
}



export default AppProviders
