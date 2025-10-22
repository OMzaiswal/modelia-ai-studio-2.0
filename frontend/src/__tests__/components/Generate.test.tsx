import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Generate } from '../../components/Generate'

describe('Generate Component (smoke tests only)', () => {
  it('renders generate component', () => {
    render(<Generate />)
    expect(screen.getByText('Generate AI Image')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /generate/i })).toBeInTheDocument()
  })
})