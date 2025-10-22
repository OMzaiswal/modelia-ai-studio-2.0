# Testing Guide for Modelia 2.0

This project includes comprehensive testing across three levels: Backend (Jest + Supertest), Frontend (React Testing Library), and End-to-End (Playwright).

## Test Structure

```
├── backend/
│   ├── src/__tests__/
│   │   ├── setup.ts              # Test setup and database cleanup
│   │   ├── auth.test.ts          # Authentication tests
│   │   └── generations.test.ts   # Generation API tests
│   └── jest.config.js            # Jest configuration
├── frontend/
│   ├── src/__tests__/
│   │   ├── setup.ts              # Test setup and mocks
│   │   └── components/
│   │       ├── Upload.test.tsx
│   │       ├── PromptInput.test.tsx
│   │       ├── StyleDropdown.test.tsx
│   │       └── Generate.test.tsx
│   └── vitest.config.ts          # Vitest configuration
├── e2e/
│   ├── auth.spec.ts              # Authentication E2E tests
│   ├── generation.spec.ts        # Generation flow E2E tests
│   └── history.spec.ts           # History and navigation E2E tests
└── playwright.config.ts          # Playwright configuration
```

## Running Tests

### Install Dependencies
```bash
# Install all dependencies
npm run install:all

# Or install individually
cd backend && npm install
cd frontend && npm install
npm install  # For root dependencies
```

### Backend Tests (Jest + Supertest)
```bash
# Run all backend tests
npm run test:backend

# Run with coverage
cd backend && npm run test:coverage

# Run in watch mode
cd backend && npm run test:watch
```

**Backend Test Coverage:**
- ✅ Auth: signup/login happy paths and invalid input
- ✅ Generations: success case, simulated overload error, unauthorized access
- ✅ Validation: consistent error structure and HTTP codes
- ✅ Database cleanup between tests
- ✅ JWT token validation
- ✅ File upload handling

### Frontend Tests (React Testing Library + Vitest)
```bash
# Run all frontend tests
npm run test:frontend

# Run with coverage
cd frontend && npm run test:coverage

# Run with UI
cd frontend && npm run test:ui
```

**Frontend Test Coverage:**
- ✅ Component rendering (Upload, PromptInput, StyleDropdown, Generate)
- ✅ Generate flow: loading state → success → history updated
- ✅ Error and retry handling (up to 3 attempts)
- ✅ Abort button cancels in-flight request (AbortController)
- ✅ Form validation and user interactions
- ✅ File upload validation (type, size)

### End-to-End Tests (Playwright)
```bash
# Run all E2E tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui

# Run specific test file
npx playwright test auth.spec.ts
```

**E2E Test Coverage:**
- ✅ Complete user flow: signup → login → upload → generate → view history → logout
- ✅ Authentication flow with validation errors
- ✅ Generation flow with abort functionality
- ✅ Navigation and history management
- ✅ Cross-browser testing (Chrome, Firefox, Safari)

### Run All Tests
```bash
# Run all tests (backend + frontend + e2e)
npm run test:all
```

## Test Features

### Backend Testing
- **Database Integration**: Uses real Prisma client with test database
- **Authentication**: Tests JWT token generation and validation
- **API Endpoints**: Tests all auth and generation endpoints
- **Error Handling**: Tests various error scenarios and status codes
- **File Upload**: Tests multipart form data handling
- **Mocking**: Mocks AI simulation for controlled testing

### Frontend Testing
- **Component Isolation**: Each component tested independently
- **User Interactions**: Tests user input, clicks, and form submissions
- **State Management**: Tests component state changes
- **Error Handling**: Tests error states and retry mechanisms
- **AbortController**: Tests request cancellation functionality
- **Mocking**: Mocks external dependencies (axios, router, toast)

### E2E Testing
- **Real Browser**: Tests in actual browser environments
- **Full User Journey**: Tests complete user workflows
- **Cross-Browser**: Tests on Chrome, Firefox, and Safari
- **Visual Testing**: Screenshots on failure
- **Parallel Execution**: Runs tests in parallel for speed

## Test Data and Setup

### Backend Test Setup
- Uses test database (configured in `setup.ts`)
- Cleans up data between tests
- Mocks environment variables
- Sets up test JWT secrets

### Frontend Test Setup
- Mocks external dependencies
- Sets up test environment variables
- Provides mock file reading capabilities
- Mocks router and navigation

### E2E Test Setup
- Starts both frontend and backend servers
- Uses test database
- Handles authentication state
- Provides test file uploads

## Writing New Tests

### Backend Tests
```typescript
// Example: Adding a new API test
describe('New Feature', () => {
  it('should handle new endpoint', async () => {
    const response = await request(app)
      .post('/new-endpoint')
      .send({ data: 'test' })
      .expect(200);
    
    expect(response.body).toHaveProperty('expectedField');
  });
});
```

### Frontend Tests
```typescript
// Example: Adding a new component test
describe('New Component', () => {
  it('should render correctly', () => {
    render(<NewComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### E2E Tests
```typescript
// Example: Adding a new E2E test
test('should complete new user flow', async ({ page }) => {
  await page.goto('/new-page');
  await page.click('button:has-text("Action")');
  await expect(page.getByText('Expected Result')).toBeVisible();
});
```

## Continuous Integration

The test suite is designed to run in CI environments:
- Backend tests use test database
- Frontend tests run in jsdom environment
- E2E tests run in headless mode
- All tests are parallelized for speed
- Coverage reports are generated

## Troubleshooting

### Common Issues
1. **Database Connection**: Ensure test database is running
2. **Port Conflicts**: Make sure ports 3000 and 3001 are available
3. **File Permissions**: Ensure test files can be created/deleted
4. **Browser Installation**: Run `npx playwright install` for E2E tests

### Debug Mode
```bash
# Debug frontend tests
cd frontend && npm run test -- --reporter=verbose

# Debug E2E tests
npx playwright test --debug

# Debug backend tests
cd backend && npm run test -- --verbose
```

## Coverage Reports

Coverage reports are generated for both backend and frontend:
- Backend: `backend/coverage/`
- Frontend: `frontend/coverage/`

Target coverage: >80% for all modules.
