import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import StyleDropdown from '../../components/StyleDropdown'

describe('StyleDropdown Component', () => {
  const mockOnChange = vi.fn()

  it('renders style dropdown correctly', () => {
    render(<StyleDropdown value="Editorial" onchange={mockOnChange} />)
    
    expect(screen.getByDisplayValue('Editorial')).toBeInTheDocument()
  })

  it('displays all style options', () => {
    render(<StyleDropdown value="Editorial" onchange={mockOnChange} />)
    
    const select = screen.getByRole('combobox')
    
    expect(screen.getByText('Editorial')).toBeInTheDocument()
    expect(screen.getByText('Streetwear')).toBeInTheDocument()
    expect(screen.getByText('Vintage')).toBeInTheDocument()
  })

  it('calls onChange when style is selected', () => {
    render(<StyleDropdown value="Editorial" onchange={mockOnChange} />)
    
    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'Streetwear' } })
    
    expect(mockOnChange).toHaveBeenCalledWith('Streetwear')
  })

  it('displays the correct initial value', () => {
    render(<StyleDropdown value="Vintage" onchange={mockOnChange} />)
    
    expect(screen.getByDisplayValue('Vintage')).toBeInTheDocument()
  })

  it('handles all style changes correctly', () => {
    render(<StyleDropdown value="Editorial" onchange={mockOnChange} />)
    
    const select = screen.getByRole('combobox')
    
    // Test Editorial
    fireEvent.change(select, { target: { value: 'Editorial' } })
    expect(mockOnChange).toHaveBeenCalledWith('Editorial')
    
    // Test Streetwear
    fireEvent.change(select, { target: { value: 'Streetwear' } })
    expect(mockOnChange).toHaveBeenCalledWith('Streetwear')
    
    // Test Vintage
    fireEvent.change(select, { target: { value: 'Vintage' } })
    expect(mockOnChange).toHaveBeenCalledWith('Vintage')
  })
})
