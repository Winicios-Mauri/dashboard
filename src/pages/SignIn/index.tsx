import React from 'react'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'

import { Container, Logo, Form, FormTitle } from './styles'

const SignIn: React.FC = () => {
  return (
    <Container>
      <Logo>
        <img src={logoImg} alt="Minha Carteira" />
        <h2>Minha Carteira</h2>
      </Logo>
      <Form>
        <FormTitle onSubmit={() => {}}>Entrar</FormTitle>
        <Input type="email" required placeholder="E-mail" />
        <Input type="password" required placeholder="Senha" />
        <input type="text"></input>
        <input type="text"></input>
        <button type="submit">Acessar</button>
      </Form>
    </Container>
  )
}

export default SignIn
