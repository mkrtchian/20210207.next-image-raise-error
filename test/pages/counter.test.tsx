import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import { Counter } from '../../pages/counter'

describe('Counter', () => {
  it('Initial Value is 0', async () => {
    render(<Counter />)
    await waitFor(() => expect(screen.getByText('0', { selector: 'p' })))
  })

  it('Pressing `+` button increments the counter.', async () => {
    render(<Counter />)
    expect(screen.getByText('0', { selector: 'p' }))
    fireEvent.click(screen.getByText('+', { selector: 'button' }))
    await waitFor(() => expect(screen.getByText('1', { selector: 'p' })))
  })
})
