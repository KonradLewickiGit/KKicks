import { Input } from '../../atoms/Input/Input.styles'
import { Label } from '../../atoms/Label/Label.styles'
import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  margin: 20px auto 0px auto;

  ${Label} {
    margin: 5px 0;
    padding-left: 8px;
    font-size: ${({ theme }) => theme.fontSize.l};
  }

  ${Input} {
    padding-top: 10px;
    padding-bottom: 10px;
    color: ${({ theme }) => theme.colors.black};
    max-width: 400px;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.darkGrey};
    border-radius: 10px;
  }

  & > span {
    color: ${({ theme }) => theme.colors.white};
    padding-left: 8px;
    margin-top: 3px;
  }
`
