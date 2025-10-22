import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should complete signup → login → logout flow', async ({ page }) => {
    // Navigate to register page
    await page.goto('/register');
    
    // Fill registration form
    await page.fill('input[placeholder*="Name"]', 'Test User');
    await page.fill('input[placeholder*="Email"]', 'test@example.com');
    await page.fill('input[placeholder*="Password"]', 'Test123!');
    
    // Submit registration
    await page.click('button[type="submit"]');
    
    // Should redirect to login page or show success
    await expect(page).toHaveURL('/login');
    
    // Fill login form
    await page.fill('input[placeholder*="Email"]', 'test@example.com');
    await page.fill('input[placeholder*="Password"]', 'Test123!');
    
    // Submit login
    await page.click('button[type="submit"]');
    
    // Should redirect to home page
    await expect(page).toHaveURL('/home');
    
    // Should show logout button
    await expect(page.getByRole('button', { name: /logout/i })).toBeVisible();
    
    // Test logout
    await page.click('button:has-text("Logout")');
    
    // Should redirect to login page
    await expect(page).toHaveURL('/login');
  });

  test('should show validation errors for invalid input', async ({ page }) => {
    await page.goto('/register');
    
    // Try to submit with invalid data
    await page.fill('input[placeholder*="Name"]', 'A'); // Too short
    await page.fill('input[placeholder*="Email"]', 'invalid-email');
    await page.fill('input[placeholder*="Password"]', 'weak');
    
    await page.click('button[type="submit"]');
    
    // Should show validation errors
    await expect(page.getByText(/at least 2 characters/i)).toBeVisible();
    await expect(page.getByText(/Invalid Email/i)).toBeVisible();
    await expect(page.getByText(/at least 5 characters/i)).toBeVisible();
  });

  test('should handle login with non-existent user', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('input[placeholder*="Email"]', 'nonexistent@example.com');
    await page.fill('input[placeholder*="Password"]', 'Test123!');
    
    await page.click('button[type="submit"]');
    
    // Should show error message
    await expect(page.getByText(/User not found/i)).toBeVisible();
  });

  test('should handle login with wrong password', async ({ page }) => {
    // First register a user
    await page.goto('/register');
    await page.fill('input[placeholder*="Name"]', 'Test User');
    await page.fill('input[placeholder*="Email"]', 'test@example.com');
    await page.fill('input[placeholder*="Password"]', 'Test123!');
    await page.click('button[type="submit"]');
    
    // Then try to login with wrong password
    await page.goto('/login');
    await page.fill('input[placeholder*="Email"]', 'test@example.com');
    await page.fill('input[placeholder*="Password"]', 'WrongPassword123!');
    
    await page.click('button[type="submit"]');
    
    // Should show error message
    await expect(page.getByText(/Invalid password/i)).toBeVisible();
  });
});
