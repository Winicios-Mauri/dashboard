import React from 'react'
import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'

import { Container } from './styles'

const Dashboard: React.FC = () => {
  const options = [
    { value: 'Winicios', label: 'Winicios' },
    { value: 'Maria', label: 'Maria' },
    { value: 'Joaao', label: 'Joaao' }
  ]

  return (
    <Container>
      <ContentHeader title="Dasboard" lineColor="#cf6518">
        <SelectInput options={options} onChange={() => {}} />
      </ContentHeader>
    </Container>
  )
}

export default Dashboard
