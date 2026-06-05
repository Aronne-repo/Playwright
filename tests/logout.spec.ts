import {test, expect} from '@playwright/test';

test('Logout', async ({ page }) => {
  await page.goto('/web/index.php/dashboard/index');

  const logoutResponse = page.waitForResponse(res =>
    res.url().includes('/events/push')
  );

  await page.click('.oxd-userdropdown-tab');
  await page.getByText('Logout').click();

  await expect(page).toHaveURL(/auth\/login/);
  expect((await logoutResponse).status()).toBe(200);
});