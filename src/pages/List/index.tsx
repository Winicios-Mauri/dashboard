import React from 'react'
import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'

import { Container } from './styles'

const List: React.FC = () => {
  const options = [
    { value: 'Winicios', label: 'Winicios' },
    { value: 'Maria', label: 'Maria' },
    { value: 'Joaao', label: 'Joaao' }
  ]
  return (
    <Container>
      <ContentHeader title="Saídas" lineColor="#cf1818">
        <SelectInput options={options} />
      </ContentHeader>
    </Container>
  )
}

export default List
