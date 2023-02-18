import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`;

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const NavgationLink = styled(NavLink)`
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    color: grey;
  }
  &.active {
    border-bottom: 2px solid black;
  }
`;
