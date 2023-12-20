import React, { ReactNode } from 'react'

import { GlobalStyle } from '../assets/styles/GlobalStyle'
import { theme } from '../assets/styles/theme'
import PropTypes from 'prop-types'
import { useUserTheme } from '../hooks/useTheme'
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

interface Props {
  children: ReactNode
}

const ThemeAndStylesProvider: React.FC<Props> = ({ children }) => {
  const theme = useUserTheme();
  return (
    <StyledThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </StyledThemeProvider>
  )
}

ThemeAndStylesProvider.propTypes = {
  children: PropTypes.node,
}

export default ThemeAndStylesProvider
