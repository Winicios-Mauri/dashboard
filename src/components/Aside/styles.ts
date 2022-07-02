import styled, { css } from 'styled-components'

interface IContainerProps {
  menuIsOpen: boolean
}

interface IThemeToggleFooterProps {
  menuIsOpen: boolean
}

// Criando elemento container
export const Container = styled.div<IContainerProps>`
  grid-area: AS;

  background-color: ${props => props.theme.colors.secondary};
  padding-left: 20px;

  border-right: 1px solid ${props => props.theme.colors.gray};

  position: relative;

  @media (max-width: 600px) {
    width: 150px;
    padding-left: 7px;
    position: fixed;
    z-index: 2;

    height: ${props => (props.menuIsOpen ? '100vh' : '70px')};
    overflow: hidden;

    ${props =>
      !props.menuIsOpen &&
      css`
        border: none;
        border-bottom: 1px solid ${props => props.theme.colors.gray};
      `}
  }
`

export const Header = styled.header`
  display: flex;
  align-items: center;

  height: 70px;
`

export const LogImg = styled.img`
  height: 40px;
  width: 40px;

  @media (max-width: 380px) {
    display: none;
    height: 25px;
    width: 25px;
  }
`

export const Title = styled.h3`
  color: ${props => props.theme.colors.white};
  margin-left: 10px;

  @media (max-width: 600px) {
    display: none;
  }
`

export const MenuContainer = styled.nav`
  margin-top: 50px;
`

export const MenuItemLink = styled.a`
  color: ${props => props.theme.colors.info};
  text-decoration: none;
  transition: opacity 0.3s;

  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.7;
    color: ${props => props.theme.colors.gray};
  }

  > svg {
    font-size: 18px;
    margin-right: 10px;
  }
`

export const MenuItemButton = styled.button`
  font-size: 16px;
  color: ${props => props.theme.colors.info};
  transition: opacity 0.3s;

  border: none;
  background: none;

  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.7;
    color: ${props => props.theme.colors.gray};
  }

  > svg {
    font-size: 18px;
    margin-right: 10px;
  }
`

export const ToggleMenu = styled.button`
  width: 40px;
  height: 40px;

  border-radius: 5px;
  font-size: 20px;
  background-color: ${props => props.theme.colors.warning};
  color: ${props => props.theme.colors.white};

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  display: none;

  justify-content: center;
  align-items: center;

  @media (max-width: 380px) {
    display: flex;

    justify-content: center;
    align-items: center;
  }
`

export const ThemeToggleFooter = styled.footer<IThemeToggleFooterProps>`
  display: none;
  position: absolute;
  bottom: 30px;

  @media (max-width: 400px) {
    display: ${props => (props.menuIsOpen ? 'flex' : 'none')};
  }
`
