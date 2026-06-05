import {test, expect} from '@playwright/test';

test('Sidebar text search functionality should work correctly', async ({ page }) => {
  await page.goto('/web/index.php/dashboard/index');

  const chevronIcon = page.locator('i[class*="bi-chevron-"]');
  const classes = await chevronIcon.getAttribute('class');

  if (classes?.includes('toggled')) {
    await chevronIcon.locator('xpath=..').locator('button').click();
  }

  await page.locator('.oxd-sidepanel-body .oxd-input').fill('My Info');
  await expect(page.locator('.oxd-main-menu-item-wrapper')).toContainText('My Info');
});