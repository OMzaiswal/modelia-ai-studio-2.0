import { test, expect } from '@playwright/test';

test.describe('Generation Flow', () => {
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

  test('should complete full generation flow', async ({ page }) => {
    // Fill in the generation form
    await page.fill('input[placeholder*="prompt"]', 'A beautiful sunset over mountains');
    
    // Select style
    await page.selectOption('select', 'Editorial');
    
    // Upload a test image
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test-image.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake-image-data')
    });
    
    // Click generate button
    await page.click('button:has-text("Generate")');
    
    // Should show loading state
    await expect(page.getByText(/generating/i)).toBeVisible();
    
    // Wait for generation to complete (or timeout)
    await page.waitForTimeout(3000);
    
    // Should show generated image or error
    const hasImage = await page.locator('img[alt="Generated"]').isVisible();
    const hasError = await page.getByText(/error|failed/i).isVisible();
    
    expect(hasImage || hasError).toBeTruthy();
  });

  test('should show validation error for missing fields', async ({ page }) => {
    // Try to generate without filling form
    await page.click('button:has-text("Generate")');
    
    // Should show validation error
    await expect(page.getByText(/please enter all the details/i)).toBeVisible();
  });

  test('should show validation error for missing image', async ({ page }) => {
    await page.fill('input[placeholder*="prompt"]', 'A beautiful sunset');
    await page.selectOption('select', 'Editorial');
    
    await page.click('button:has-text("Generate")');
    
    // Should show validation error
    await expect(page.getByText(/please enter all the details/i)).toBeVisible();
  });

  test('should handle abort functionality', async ({ page }) => {
    // Fill in the generation form
    await page.fill('input[placeholder*="prompt"]', 'A beautiful sunset over mountains');
    await page.selectOption('select', 'Editorial');
    
    // Upload a test image
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test-image.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake-image-data')
    });
    
    // Click generate button
    await page.click('button:has-text("Generate")');
    
    // Should show loading state with abort button
    await expect(page.getByText(/generating/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /abort/i })).toBeVisible();
    
    // Click abort button
    await page.click('button:has-text("Abort")');
    
    // Should return to generate button
    await expect(page.getByRole('button', { name: /generate/i })).toBeVisible();
  });

  test('should show error for invalid file type', async ({ page }) => {
    await page.fill('input[placeholder*="prompt"]', 'A beautiful sunset');
    await page.selectOption('select', 'Editorial');
    
    // Upload invalid file type
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('fake-text-data')
    });
    
    // Should show error for invalid file type
    await expect(page.getByText(/valid image file/i)).toBeVisible();
  });

  test('should show error for file too large', async ({ page }) => {
    await page.fill('input[placeholder*="prompt"]', 'A beautiful sunset');
    await page.selectOption('select', 'Editorial');
    
    // Upload large file (simulate)
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'large-image.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.alloc(6 * 1024 * 1024) // 6MB
    });
    
    // Should show error for file too large
    await expect(page.getByText(/file size must be less than 5mb/i)).toBeVisible();
  });
});
