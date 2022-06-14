import React, { useMemo, useState, useEffect } from 'react'

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import HistoryFinanceCard from '../../components/HistoryFinanceCard'

import gains from '../../repositories/gains'
import expenses from '../../repositories/expenses'
import formatCurrency from '../../utils/formatCurrency'
import formatDate from '../../utils/formatDate'

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

  const months = [
    { value: 6, label: 'Junho' },
    { value: 7, label: 'Julho' },
    { value: 8, label: 'Agosto' }
  ]

  const year = [
    { value: 2022, label: 2022 },
    { value: 2021, label: 2021 },
    { value: 2020, label: 2020 }
  ]

  useEffect(() => {
    const response = listData.map(item => {
      return {
        id: String(Math.random() * data.length),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dataFormatted: formatDate(item.date),
        tagColor: item.frequency === 'recorrente' ? '#4e41f0' : '#E44C4E'
      }
    })
    setData(response)
  }, [])

  return (
    <Container>
      <ContentHeader title={title.title} lineColor={title.lineColor}>
        <SelectInput options={months} />
        <SelectInput options={year} />
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
