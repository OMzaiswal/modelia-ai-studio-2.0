import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock environment variables
vi.mock('import.meta.env', () => ({
  VITE_API_URL: 'http://localhost:3001'
}))

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

// Mock axios
vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
    defaults: {
      withCredentials: false,
    },
  },
}))

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children, to, ...props }: any) => {
    const React = require('react');
    return React.createElement('a', { href: to, ...props }, children);
  },
  BrowserRouter: ({ children }: any) => children,
  Routes: ({ children }: any) => children,
  Route: ({ children }: any) => children,
}))

// Mock file reading for upload tests
Object.defineProperty(window, 'FileReader', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    readAsDataURL: vi.fn(),
    result: 'data:image/jpeg;base64,test-image-data',
    onload: null,
    onerror: null,
  })),
})

// Mock URL.createObjectURL
Object.defineProperty(window, 'URL', {
  writable: true,
  value: {
    createObjectURL: vi.fn(() => 'mock-object-url'),
    revokeObjectURL: vi.fn(),
  },
})
