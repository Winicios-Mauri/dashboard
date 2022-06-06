import React, { useMemo } from 'react'

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import HistoryFinanceCard from '../../components/HistoryFinanceCard'

import { Container, Content, Filters } from './styles'

interface IRouteParams {
  match: {
    params: {
      type: string
    }
  }
}

const List: React.FC<IRouteParams> = ({ match }) => {
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
        <HistoryFinanceCard
          tagColor="#E44C4E"
          title="Conta de Luz"
          subtitle="01/06/2022"
          amount="R$ 100,00"
        />
      </Content>
    </Container>
  )
}

export default List
