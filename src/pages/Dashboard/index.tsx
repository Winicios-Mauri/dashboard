import React, { useState, useMemo } from 'react'

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import WalletBox from '../../components/WalletBox'

import expenses from '../../repositories/expenses'
import gains from '../../repositories/gains'
import listOffMonths from '../../utils/months'
import MessageBox from '../../components/MessageBox'

import happyImg from '../../assets/happy.svg'
import sadImg from '../../assets/sad.svg'

import { Container, Content } from './styles'

const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  )
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear()
  )

  const options = [
    { value: 'Winicios', label: 'Winicios' },
    { value: 'Maria', label: 'Maria' },
    { value: 'Joao', label: 'Joao' }
  ]

  const years = useMemo(() => {
    let uniqueYears: number[] = []

    ;[...expenses, ...gains].forEach(item => {
      const date = new Date(item.date)
      const year = date.getFullYear()

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year)
      }
    })

    return uniqueYears.map(year => {
      return {
        value: year,
        label: year
      }
    })
  }, [])

  const months = useMemo(() => {
    return listOffMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month
      }
    })
  }, [])

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month)
      setMonthSelected(parseMonth)
    } catch (error) {
      throw new Error('Erro ao converter o mes')
    }
  }

  // convertendo ano para numero
  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year)
      setYearSelected(parseYear)
    } catch (error) {
      throw new Error('Erro ao converter o ano')
    }
  }

  return (
    <Container>
      <ContentHeader title="Dasboard" lineColor="#cf6518">
        <SelectInput
          options={months}
          onChange={e => handleMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          onChange={e => handleYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>
      <Content>
        <WalletBox
          title="saldo"
          color="#4E41F0"
          amount={150.0}
          footerLabel="atualizado com base na entrada e saida"
          icon="dolar"
        />
        <WalletBox
          title="entradas"
          color="#f7931b"
          amount={5000.0}
          footerLabel="atualizado com base na entrada e saida"
          icon="arrowUp"
        />
        <WalletBox
          title="saidas"
          color="#e44c4e"
          amount={4850.0}
          footerLabel="atualizado com base na entrada e saida"
          icon="arrowDown"
        />

        <MessageBox
          title="Muito Bem!"
          description="Sua carteira está positiva!"
          footerText="Continue assim. Considere seu saldo sempre!"
          icon={happyImg}
        />
      </Content>
    </Container>
  )
}

export default Dashboard
