import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Upload from '../../components/Upload'
import PromptInput from '../../components/PromptInput'
import StyleDropdown from '../../components/StyleDropdown'

describe('Simple Component Tests', () => {
  describe('Upload Component', () => {
    it('renders upload component', () => {
      const mockOnUpload = () => {}
      render(<Upload onUpload={mockOnUpload} />)
      
      expect(screen.getByText('No Image Selected')).toBeInTheDocument()
    })
  })

  describe('PromptInput Component', () => {
    it('renders prompt input', () => {
      const mockOnChange = () => {}
      render(<PromptInput onChange={mockOnChange} />)
      
      expect(screen.getByPlaceholderText('Enter your prompt')).toBeInTheDocument()
    })
  })

  describe('StyleDropdown Component', () => {
    it('renders style dropdown', () => {
      const mockOnChange = () => {}
      render(<StyleDropdown value="Editorial" onchange={mockOnChange} />)
      
      expect(screen.getByDisplayValue('Editorial')).toBeInTheDocument()
    })
  })
})
