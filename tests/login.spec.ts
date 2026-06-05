import {test, expect} from '@playwright/test';

test('Login should be performed successfully with valid credentials', async ({ page }) => {
  await page.goto('/');
  await page.goto('/web/index.php/dashboard/index');

  await expect(page).toHaveURL(/dashboard\/index/);
  await expect(page.locator('.oxd-topbar-header-title')).toBeVisible();
});

test('Login should not be performed with invalid username', async ({ page }) => {
  await page.goto('/web/index.php/auth/login');
  await page.route('**/auth/validate', async route => {
    await route.continue();
  });

  await page.locator('input[name="username"]').fill('wrongUser');
  await page.locator('input[name="password"]').fill('admin123');
  await page.locator('button[type="submit"]').click();

  const response = await page.waitForResponse(
    res => res.url().includes('/auth/validate')
  );
  expect(response.status()).toBe(302);

  await expect(page).not.toHaveURL(/dashboard\/index/);

  await expect(page.locator('.oxd-topbar-header-title')).toHaveCount(0);
  await expect(page.locator('.oxd-alert-content-text')).toBeVisible();
  await expect(page.locator('.oxd-alert-content-text')).toHaveText('Invalid credentials');
});

test('Login should not be performed with invalid password', async ({ page }) => {
  await page.goto('/web/index.php/auth/login');
  await page.route('**/auth/validate', async route => {
    await route.continue();
  });

  await page.locator('input[name="username"]').fill('Admin');
  await page.locator('input[name="password"]').fill('wrongPassword');
  await page.locator('button[type="submit"]').click();

  const response = await page.waitForResponse(
    res => res.url().includes('/auth/validate')
  );

  expect(response.status()).toBe(302);

  await expect(page).not.toHaveURL(/dashboard\/index/);

  await expect(page.locator('.oxd-topbar-header-title')).toHaveCount(0);
  await expect(page.locator('.oxd-alert-content-text')).toBeVisible();
  await expect(page.locator('.oxd-alert-content-text')).toHaveText('Invalid credentials');
});