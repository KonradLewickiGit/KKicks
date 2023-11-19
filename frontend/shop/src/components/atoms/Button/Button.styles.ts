import styled from 'styled-components'

interface Props {
  isbig?: boolean
  isNegative?: boolean
}

export const StyledButton = styled.button.attrs<Props>(props => ({
  // Usuń niestandardowe właściwości przed przekazaniem do elementu DOM
  isbig: undefined,
  isNegative: undefined,
}))<Props>`
  font-weight: bold;
  width: 100%;
  text-align: center;
  padding: ${({ isbig }) => (isbig ? '16px 32px' : '8px 18px')};
  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.babyBlue};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme, isbig }) => (isbig ? theme.fontSize.l : theme.fontSize.m)};
  cursor: pointer;
`