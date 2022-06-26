import React, { useState, useMemo } from 'react'

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import WalletBox from '../../components/WalletBox'

import expenses from '../../repositories/expenses'
import gains from '../../repositories/gains'
import listOffMonths from '../../utils/months'
import MessageBox from '../../components/MessageBox'
import PieChartBox from '../../components/PieChartBox'

import happyImg from '../../assets/happy.svg'
import sadImg from '../../assets/sad.svg'
import grinningImg from '../../assets/grinning.svg'

import { Container, Content } from './styles'

const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  )
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear()
  )

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

  const totalExpenses = useMemo(() => {
    let total: number = 0

    expenses.forEach(item => {
      const date = new Date(item.date)
      const year = date.getFullYear()
      const month = date.getMonth() + 1

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount)
        } catch {
          throw new Error('Valor inválido')
        }
      }
    })
    return total
  }, [monthSelected, yearSelected])

  const totalGains = useMemo(() => {
    let total: number = 0

    gains.forEach(item => {
      const date = new Date(item.date)
      const year = date.getFullYear()
      const month = date.getMonth() + 1

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount)
        } catch {
          throw new Error('Valor inválido')
        }
      }
    })
    return total
  }, [monthSelected, yearSelected])

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses
  }, [totalGains, totalExpenses])

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: 'Que Triste!',
        description: 'Nesse mês você gatou mais do que deveria!',
        footerText: 'Verifique seus gastos',
        icon: sadImg
      }
    } else if (totalBalance === 0) {
      return {
        title: 'Eitaaaa!',
        description: 'Nesse mês você gastou exatamente o que ganhou !',
        footerText: 'Saiba administradar o seu dinheiro',
        icon: grinningImg
      }
    } else {
      return {
        title: 'Muito Bem!',
        description: 'Sua carteira está positiva!',
        footerText: 'Continue assim. Considere seu saldo sempre!',
        icon: happyImg
      }
    }
  }, [totalBalance])

  const rellationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses

    const percentGains = (totalGains / total) * 100
    const percentExpenses = (totalExpenses / total) * 100

    const data = [
      {
        name: 'Entradas',
        value: totalExpenses,
        percent: Number(percentGains.toFixed(2)),
        color: '#E44C4E'
      },
      {
        name: 'Saídas',
        value: totalExpenses,
        percent: Number(percentExpenses.toFixed(2)),
        color: '#F7931B'
      }
    ]
    return data
  }, [totalGains, totalExpenses])

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month)
      setMonthSelected(parseMonth)
    } catch {
      throw new Error('Erro ao converter o mes')
    }
  }

  // convertendo ano para numero
  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year)
      setYearSelected(parseYear)
    } catch {
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
          amount={totalBalance}
          footerLabel="atualizado com base na entrada e saida"
          icon="dolar"
        />
        <WalletBox
          title="entradas"
          color="#f7931b"
          amount={totalGains}
          footerLabel="atualizado com base na entrada e saida"
          icon="arrowUp"
        />
        <WalletBox
          title="saidas"
          color="#e44c4e"
          amount={totalExpenses}
          footerLabel="atualizado com base na entrada e saida"
          icon="arrowDown"
        />

        <MessageBox
          title={message.title}
          description={message.description}
          footerText={message.footerText}
          icon={message.icon}
        />

        <PieChartBox data={rellationExpensesVersusGains} />
      </Content>
    </Container>
  )
}

export default Dashboard
