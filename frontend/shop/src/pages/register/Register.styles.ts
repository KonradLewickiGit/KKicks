import styled from 'styled-components'

export const Wrapper = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: 'Veranda', sans-serif;
  margin: 40px auto;

  & > button {
    margin: 40px auto 20px;
    max-width: 150px;
    font-family: 'Veranda', sans-serif;
    padding: 16px 32px;
  }

  & > span {
    color: ${({ theme }) => theme.colors.babyblue};
    margin-top: 10px;
    font-family: 'Veranda', sans-serif;
    font-weight: 700;
  }
`
