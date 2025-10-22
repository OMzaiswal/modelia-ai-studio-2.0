import { render, screen } from '@testing-library/react'
// Import Mock type alongside vi
import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest' 
import Upload from '../../components/Upload'

// 1. Define the specific type for the onUpload function signature
type OnUploadFn = (file: File | null) => void; 

describe('Upload Component', () => {
  // 2. Define the mockOnUpload variable as the specific Mock type.
  // This tells TypeScript: 
  // a) It's a function that matches OnUploadFn, AND
  // b) It's a mock object with methods like mockClear.
  const mockOnUpload: Mock<OnUploadFn> = vi.fn(); 

  beforeEach(() => {
    // FIX: TypeScript now knows mockOnUpload has the mockClear method
    mockOnUpload.mockClear(); 
  });

  it('renders upload component correctly', () => {
    // Pass the typed mock function to the required prop
    render(<Upload onUpload={mockOnUpload} />) 
    
    const input = screen.getByTestId('file-upload-input') 
    expect(input).toBeInTheDocument()
  })
})