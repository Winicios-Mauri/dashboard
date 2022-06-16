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
  const [monthSelected, setMonthSelected] = useState<string>(
    String(new Date().getMonth() + 1)
  )
  const [yearSelected, setYearSelected] = useState<string>(
    String(new Date().getFullYear())
  )

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
      console.log(JSON.stringify(listData))
      return {
        value: index + 1,
        label: month
      }
    })
  }, [])

  // Primeiro filtramos a data pelo mes e pelo ano
  useEffect(() => {
    const filteredDate = listData.filter(item => {
      const date = new Date(item.date)
      const month = String(date.getMonth() + 1)
      const year = String(date.getFullYear())

      return month === monthSelected && year === yearSelected
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
  }, [listData, monthSelected, yearSelected, data.length])

  return (
    <Container>
      <ContentHeader title={title.title} lineColor={title.lineColor}>
        <SelectInput
          options={months}
          onChange={e => setMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          onChange={e => setYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>

      <Filters>
        <button type="button" className="tag-filter tag-filter-recurrent">
          Recorrentes
        </button>
        <button type="button" className="tag-filter tag-filter-eventual">
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
