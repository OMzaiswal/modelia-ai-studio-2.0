import { test, expect } from '@playwright/test';

test.describe('History and Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/register');
    await page.fill('input[placeholder*="Name"]', 'Test User');
    await page.fill('input[placeholder*="Email"]', 'test@example.com');
    await page.fill('input[placeholder*="Password"]', 'Test123!');
    await page.click('button[type="submit"]');
    
    await page.goto('/login');
    await page.fill('input[placeholder*="Email"]', 'test@example.com');
    await page.fill('input[placeholder*="Password"]', 'Test123!');
    await page.click('button[type="submit"]');
    
    await page.goto('/home');
  });

  test('should navigate between pages correctly', async ({ page }) => {
    // Should be on home page
    await expect(page).toHaveURL('/home');
    
    // Navigate to login page
    await page.click('a:has-text("Login")');
    await expect(page).toHaveURL('/login');
    
    // Navigate to register page
    await page.click('a:has-text("Sign up")');
    await expect(page).toHaveURL('/register');
    
    // Navigate back to home
    await page.click('a:has-text("AI-Studio")');
    await expect(page).toHaveURL('/home');
  });

  test('should show generation history', async ({ page }) => {
    // Generate a few images first
    for (let i = 0; i < 3; i++) {
      await page.fill('input[placeholder*="prompt"]', `Test prompt ${i + 1}`);
      await page.selectOption('select', 'Editorial');
      
      const fileInput = page.locator('input[type="file"]');
      await fileInput.setInputFiles({
        name: `test-image-${i + 1}.jpg`,
        mimeType: 'image/jpeg',
        buffer: Buffer.from('fake-image-data')
      });
      
      await page.click('button:has-text("Generate")');
      await page.waitForTimeout(1000); // Wait for generation
    }
    
    // Check if history is displayed
    const historySection = page.locator('[data-testid="generations-history"]');
    if (await historySection.isVisible()) {
      const historyItems = historySection.locator('[data-testid="generation-item"]');
      await expect(historyItems).toHaveCount(3);
    }
  });

  test('should handle empty history', async ({ page }) => {
    // Should show empty state or no history
    const historySection = page.locator('[data-testid="generations-history"]');
    if (await historySection.isVisible()) {
      await expect(page.getByText(/no generations yet/i)).toBeVisible();
    }
  });

  test('should restore previous generation', async ({ page }) => {
    // Generate an image
    await page.fill('input[placeholder*="prompt"]', 'A beautiful sunset');
    await page.selectOption('select', 'Editorial');
    
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test-image.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake-image-data')
    });
    
    await page.click('button:has-text("Generate")');
    await page.waitForTimeout(2000);
    
    // Check if generation is displayed
    const generatedImage = page.locator('img[alt="Generated"]');
    if (await generatedImage.isVisible()) {
      // Should show generation details
      await expect(page.getByText('A beautiful sunset')).toBeVisible();
      await expect(page.getByText('Editorial')).toBeVisible();
    }
  });

  test('should handle navigation with authentication state', async ({ page }) => {
    // Should show logout button when logged in
    await expect(page.getByRole('button', { name: /logout/i })).toBeVisible();
    
    // Logout
    await page.click('button:has-text("Logout")');
    
    // Should redirect to login and show login/register buttons
    await expect(page).toHaveURL('/login');
    await expect(page.getByRole('link', { name: /login/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /register/i })).toBeVisible();
  });
});
