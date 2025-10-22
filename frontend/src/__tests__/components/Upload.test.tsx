import { render, screen } from '@testing-library/react'
import Upload from '../../components/Upload'

describe('Upload Component', () => {
  it('renders upload component correctly', () => {
    render(<Upload />)
    const input = screen.getByTestId('file-upload-input')
    expect(input).toBeInTheDocument()
  })
})
