import React, { useState, useMemo } from 'react'

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import WalletBox from '../../components/WalletBox'

import expenses from '../../repositories/expenses'
import gains from '../../repositories/gains'
import listOffMonths from '../../utils/months'
import MessageBox from '../../components/MessageBox'
import PieChartBox from '../../components/PieChartBox'
import HistoryBox from '../../components/HistoryBox'
import BarChartBox from '../../components/BarChartBox'

import happyImg from '../../assets/happy.svg'
import sadImg from '../../assets/sad.svg'
import grinningImg from '../../assets/grinning.svg'
import opsImg from '../../assets/ops.svg'

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
    } else if (totalGains === 0 && totalExpenses === 0) {
      return {
        title: 'Ops',
        description: 'Nesse mês não há registro de entrada e saída',
        footerText: 'Neste mês não foi realizado nenhum tipo de movimentação',
        icon: opsImg
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
  }, [totalBalance, totalGains, totalExpenses])

  const rellationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses

    const percentGains = Number(((totalGains / total) * 100).toFixed(2))
    const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(2))

    const data = [
      {
        name: 'Entradas',
        value: totalGains,
        percent: percentGains ? percentGains : 0,
        color: '#E44C4E'
      },
      {
        name: 'Saídas',
        value: totalExpenses,
        percent: percentExpenses ? percentExpenses : 0,
        color: '#F7931B'
      }
    ]
    return data
  }, [totalGains, totalExpenses])

  const historyData = useMemo(() => {
    return listOffMonths
      .map((_, month) => {
        let amountEntry = 0
        gains.forEach(gains => {
          const date = new Date(gains.date)
          const gainMonth = date.getMonth()
          const gainYear = date.getFullYear()

          if (gainMonth === month && gainYear === yearSelected) {
            try {
              amountEntry += Number(gains.amount)
            } catch {
              throw new Error('Valor de entrada inválido')
            }
          }
        })

        let amountOutput = 0
        expenses.forEach(expenses => {
          const date = new Date(expenses.date)
          const expensesMonth = date.getMonth()
          const expensesYear = date.getFullYear()

          if (expensesMonth === month && expensesYear === yearSelected) {
            try {
              amountOutput += Number(expenses.amount)
            } catch {
              throw new Error('Valor de saída inválido')
            }
          }
        })

        return {
          monthNumber: month,
          month: listOffMonths[month].substring(0, 3),
          amountEntry,
          amountOutput
        }
      })
      .filter(item => {
        const currentMont = new Date().getMonth()
        const currenYear = new Date().getFullYear()

        return (
          (yearSelected === currenYear && item.monthNumber <= currentMont) ||
          yearSelected < currenYear
        )
      })
  }, [yearSelected])

  const relationExpensesRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0
    let amountEventual = 0

    expenses
      .filter(expense => {
        const date = new Date(expense.date)
        const year = date.getFullYear()
        const month = date.getMonth() + 1

        return month === monthSelected && year === yearSelected
      })
      .forEach(expense => {
        if (expense.frequency === 'recorrente') {
          return (amountRecurrent += Number(expense.amount))
        }
        if (expense.frequency === 'eventual') {
          return (amountEventual += Number(expense.amount))
        }
      })

    const total = amountRecurrent + amountEventual
    const percentRecurrent = Number(
      ((amountRecurrent / total) * 100).toFixed(2)
    )
    const percentEventual = Number(((amountEventual / total) * 100).toFixed(2))

    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: percentRecurrent ? percentRecurrent : 0,
        color: '#f7931b'
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: percentEventual ? percentEventual : 0,
        color: '#e44c4e'
      }
    ]
  }, [yearSelected, monthSelected])

  const relationGainssRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0
    let amountEventual = 0

    gains
      .filter(gain => {
        const date = new Date(gain.date)
        const year = date.getFullYear()
        const month = date.getMonth() + 1

        return month === monthSelected && year === yearSelected
      })
      .forEach(gain => {
        if (gain.frequency === 'recorrente') {
          return (amountRecurrent += Number(gain.amount))
        }
        if (gain.frequency === 'eventual') {
          return (amountEventual += Number(gain.amount))
        }
      })

    const total = amountRecurrent + amountEventual
    const percentRecurrent = Number(
      ((amountRecurrent / total) * 100).toFixed(2)
    )
    const percentEventual = Number(((amountEventual / total) * 100).toFixed(2))

    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: percentRecurrent ? percentRecurrent : 0,
        color: '#f7931b'
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: percentEventual ? percentEventual : 0,
        color: '#e44c4e'
      }
    ]
  }, [yearSelected, monthSelected])

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

        <HistoryBox
          data={historyData}
          lineColorAmountEntry="#f7931b"
          lineColorAmountOutput="#e44c4e"
        />

        <BarChartBox
          title="Saídas"
          data={relationExpensesRecurrentVersusEventual}
        />

        <BarChartBox
          title="Entradas"
          data={relationGainssRecurrentVersusEventual}
        />
      </Content>
    </Container>
  )
}

export default Dashboard
