import { screen, render, fireEvent, act } from '@testing-library/react'
import { Counter } from '../../pages/counter'

describe('Counter', () => {
  it('Initial Value is 0', async () => {
    render(<Counter />)
    await act(async () => {
      expect(screen.getByText('0', { selector: 'p' }))
      await new Promise((res) => setTimeout(res, 100))
    })
  })

  it('Pressing `+` button increments the counter.', async () => {
    render(<Counter />)
    expect(screen.getByText('0', { selector: 'p' }))
    fireEvent.click(screen.getByText('+', { selector: 'button' }))
    await act(async () => {
      expect(screen.getByText('1', { selector: 'p' }))
      await new Promise((res) => setTimeout(res, 100))
    })
  })
})
