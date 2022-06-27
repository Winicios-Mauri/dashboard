import styled from 'styled-components'

interface ILengendProps {
  color: string
}

export const Container = styled.div`
  width: 100%;
  height: 300px;

  display: flex;
  flex-direction: column;

  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.white};

  margin: 10px 0;
  padding: 30px 20px;

  border-radius: 7px;
`

export const Header = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;

  h2 {
    margin-bottom: 20px;
    padding-left: 15px;
  }
`

export const LegendContainer = styled.div`
  list-style: none;

  display: flex;
  padding-right: 15px;
`

export const Legend = styled.li<ILengendProps>`
  display: flex;
  align-items: center;

  margin-bottom: 7px;
  margin-left: 7px;

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
