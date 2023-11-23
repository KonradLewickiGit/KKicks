// LoggedHeader.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
background-color: ${({ theme }) => theme.colors.lightGrey};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: bold;
  color: #89CFF0; // Kolor baby blue
`;
const NavContainer = styled.nav`
  display: flex;
  gap: 1rem; // Odstępy między linkami
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: 'Verdana', sans-serif; // Czcionka Verdana
  color: #000; // Kolor tekstu
  padding: 0.5rem;
  border: 1px solid #333; // Cienka ramka ciemnoszara
  border-radius: 5px; // Lekko zaokrąglone rogi

  &:hover {
    background-color: #e0e0e0; // Kolor tła przy najechaniu
  }
`;
const LoggedHeader: React.FC = () => {
  return (
    <HeaderContainer>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Logo>K&Kicks</Logo>
      </Link>
      <nav>
        <StyledLink to="/profile">Profil</StyledLink>
      </nav>
    </HeaderContainer>
  );
};

export default LoggedHeader;
