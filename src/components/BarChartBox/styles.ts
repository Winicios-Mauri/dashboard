import styled from 'styled-components'

interface ILengendProps {
  color: string
}

export const Container = styled.div`
  width: 48%;
  min-height: 260px;

  margin: 10px 0;

  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.white};

  border-radius: 7px;

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: auto;
  }
`

export const SideLeft = styled.aside`
  flex: 1;
  padding: 30px 20px;

  > h2 {
    padding-left: 14px;
    margin-bottom: 10px;
  }
`

export const LegendContainer = styled.ul`
  list-style: none;

  max-height: 175px;
  padding-right: 15px;

  overflow-y: scroll;

  display: flex;
  justify-content: flex-end;
  gap: 2;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.secondary};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${props => props.theme.colors.tertiary};
  }

  @media (max-width: 1200px) {
    display: flex;

    height: auto;
  }
`

export const Legend = styled.li<ILengendProps>`
  display: flex;
  align-items: center;
  flex-direction: column;

  margin-bottom: 7px;
  margin-left: 15px;

  > div {
    background-color: ${props => props.color};

    width: 70px;
    height: 40px;
    border-radius: 5px;

    margin: 3px;

    font-size: 16px;
    line-height: 40px;
    text-align: center;
  }

  > span {
    margin-left: 5px;
  }
`

export const SideRight = styled.main`
  flex: 1;
  height: 150px;
`
