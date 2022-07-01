import React from 'react'

import logoImg from '../../assets/logo.svg'

import { useAuth } from '../../hooks/auth'

import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp
} from 'react-icons/md'

import {
  Container,
  LogImg,
  Title,
  Header,
  MenuContainer,
  MenuItemLink,
  MenuItemButton
} from './styles'

const Aside: React.FC = () => {
  const { signOut } = useAuth()
  return (
    <Container>
      <Header>
        <LogImg src={logoImg} alt="Logo minha carteira" />
        <Title>Minha Carteira</Title>
      </Header>

      <MenuContainer>
        <MenuItemLink href="/">
          <MdDashboard /> Dashboard
        </MenuItemLink>
      </MenuContainer>

      <MenuContainer>
        <MenuItemLink href="/list/entry-balance">
          <MdArrowUpward /> Entradas
        </MenuItemLink>
      </MenuContainer>

      <MenuContainer>
        <MenuItemLink href="/list/exit-balance">
          <MdArrowDownward />
          Saidas
        </MenuItemLink>
      </MenuContainer>

      <MenuContainer>
        <MenuItemButton onClick={signOut}>
          <MdExitToApp />
          Sair
        </MenuItemButton>
      </MenuContainer>
    </Container>
  )
}

export default Aside
