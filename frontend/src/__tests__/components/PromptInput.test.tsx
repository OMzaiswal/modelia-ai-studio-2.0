import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import PromptInput from '../../components/PromptInput'

describe('PromptInput Component', () => {
  const mockOnChange = vi.fn()

  it('renders prompt input correctly', () => {
    render(<PromptInput onChange={mockOnChange} />)

    // check for textarea presence
    expect(screen.getByPlaceholderText('Enter your prompt')).toBeInTheDocument()
  })

  it('calls onChange when user types', () => {
    render(<PromptInput onChange={mockOnChange} />)

    const input = screen.getByPlaceholderText('Enter your prompt')
    fireEvent.change(input, { target: { value: 'New prompt text' } })

    expect(mockOnChange).toHaveBeenCalledWith('New prompt text')
  })

  it('handles empty input', () => {
    render(<PromptInput onChange={mockOnChange} />)

    const input = screen.getByPlaceholderText('Enter your prompt')
    fireEvent.change(input, { target: { value: 'Something' } })
    fireEvent.change(input, { target: { value: '' } })

    expect(mockOnChange).toHaveBeenCalledWith('')
  })

  it('handles long text input', () => {
    render(<PromptInput onChange={mockOnChange} />)

    const longText = 'A'.repeat(500)
    const input = screen.getByPlaceholderText('Enter your prompt')
    fireEvent.change(input, { target: { value: longText } })

    expect(mockOnChange).toHaveBeenCalledWith(longText)
  })
})
