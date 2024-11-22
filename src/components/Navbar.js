import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: rgba(10, 15, 25, 0.85);
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(100, 255, 218, 0.1);
`;

const Logo = styled(Link)`
  color: #64ffda;
  font-size: 1.8rem;
  font-weight: bold;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  display: flex;
  align-items: center;
`;

const NavMenu = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #ccd6f6;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 0.8rem;
  height: 100%;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: 1rem;

  &:hover {
    color: #64ffda;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  
  a {
    color: #fff;
    text-decoration: none;
    font-size: 1.1rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: #FFA500;
    }
  }
`;

function Navbar() {
  return (
    <Nav>
      <Logo to='/'>VG</Logo>
      <NavMenu>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/projects'>Projects</NavLink>
        <NavLink to='/contact'>Contact</NavLink>
      </NavMenu>
    </Nav>
  );
}

export default Navbar;
