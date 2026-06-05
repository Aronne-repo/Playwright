import {test, expect} from '@playwright/test';
import {userDropdownOptions} from '../fixtures/user_dropdown_options';

test('Dashboard should have correct logo and title', async ({ page }) => {
  await page.goto('/web/index.php/dashboard/index');
  await expect(page).toHaveURL(/dashboard\/index/);

  const header = page.locator('.oxd-topbar-header');

  await expect(header.locator('h6.oxd-text')).toBeVisible();
  await expect(header.locator('h6.oxd-text')).toHaveText('Dashboard');

  const navbar = page.locator('nav.oxd-navbar-nav');

  await expect(navbar.locator('img[src*="orangehrm-logo.png"]')).toBeVisible();
});

test('Check options in user dropdown', async ({ page }) => {
  await page.goto('/web/index.php/dashboard/index');
  await page.locator('span.oxd-userdropdown-tab').click();

  const dropdownItems = page.locator('.oxd-dropdown-menu li a');

  await expect(dropdownItems.first()).toBeVisible();

  const count = await dropdownItems.count();

  for (let i = 0; i < count; i++) {
    const text = await dropdownItems.nth(i).innerText();
    expect(text.trim()).toBe(userDropdownOptions[i]);
  }
});