import React from 'react'

import { Container, ToggleLabel, ToggleSelector } from './style'

const Toggle: React.FC = () => (
  <Container>
    <ToggleLabel>Light</ToggleLabel>
    <ToggleSelector
      uncheckedIcon={false}
      checkedIcon={false}
      onChange={() => console.log('mudou')}
      checked
    />
    <ToggleLabel>Dark</ToggleLabel>
  </Container>
)

export default Toggle
