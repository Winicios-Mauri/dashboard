import React, { useMemo, useState, useEffect } from 'react'

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import HistoryFinanceCard from '../../components/HistoryFinanceCard'

import gains from '../../repositories/gains'
import expenses from '../../repositories/expenses'
import formatCurrency from '../../utils/formatCurrency'
import formatDate from '../../utils/formatDate'
import listOffMonths from '../../utils/months'

import { Container, Content, Filters } from './styles'

interface IRouteParams {
  match: {
    params: {
      type: string
    }
  }
}

interface IData {
  id: string
  description: string
  amountFormatted: string
  frequency: string
  dataFormatted: string
  tagColor: string
}

const List: React.FC<IRouteParams> = ({ match }) => {
  const [data, setData] = useState<IData[]>([])
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  )

  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear()
  )

  const [selectedFrequency, setSelectedFrequency] = useState([
    'recorrente',
    'eventual'
  ])

  const { type } = match.params

  const title = useMemo(() => {
    return type === 'entry-balance'
      ? {
          title: 'Entrada',
          lineColor: '#F7931B'
        }
      : {
          title: 'Saídas',
          lineColor: '#E44C4E'
        }
  }, [type])

  const listData = useMemo(() => {
    return type === 'entry-balance' ? gains : expenses
  }, [type])

  const years = useMemo(() => {
    let uniqueYears: number[] = []

    listData.forEach(item => {
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
  }, [listData])

  const months = useMemo(() => {
    return listOffMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month
      }
    })
  }, [])

  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = selectedFrequency.findIndex(
      item => item === frequency
    )

    if (alreadySelected >= 0) {
      const filtered = selectedFrequency.filter(item => item !== frequency)
      setSelectedFrequency(filtered)
    } else {
      setSelectedFrequency(prev => [...prev, frequency])
    }
  }

  // convertendo mês para numero
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

  // Primeiro filtramos a data pelo mes e pelo ano
  useEffect(() => {
    const filteredDate = listData.filter(item => {
      const date = new Date(item.date)
      const month = date.getMonth() + 1
      const year = date.getFullYear()

      return (
        month === monthSelected &&
        year === yearSelected &&
        selectedFrequency.includes(item.frequency)
      )
    })

    // Devovendo o valor formatado
    const formattedData = filteredDate.map(item => {
      return {
        id: String(new Date().getTime()) + item.amount,
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dataFormatted: formatDate(item.date),
        tagColor: item.frequency === 'recorrente' ? '#4e41f0' : '#E44C4E'
      }
    })
    setData(formattedData)
  }, [listData, monthSelected, yearSelected, data.length, selectedFrequency])

  return (
    <Container>
      <ContentHeader title={title.title} lineColor={title.lineColor}>
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

      <Filters>
        <button
          type="button"
          className={`tag-filter tag-filter-recurrent
          ${selectedFrequency.includes('recorrente') && 'tag-active'}
          `}
          onClick={() => handleFrequencyClick('recorrente')}
        >
          Recorrentes
        </button>
        <button
          type="button"
          className={`tag-filter tag-filter-eventual
          ${selectedFrequency.includes('eventual') && 'tag-active'}
          `}
          onClick={() => handleFrequencyClick('eventual')}
        >
          Eventuais
        </button>
      </Filters>

      <Content>
        {data.map(item => (
          <HistoryFinanceCard
            key={item.id}
            tagColor={item.tagColor}
            title={item.description}
            subtitle={item.dataFormatted}
            amount={item.amountFormatted}
          />
        ))}
      </Content>
    </Container>
  )
}

export default List
