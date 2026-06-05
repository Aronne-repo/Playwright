import {test as setup, expect} from '@playwright/test';
import {LoginPage} from '../pages/login_page';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login(process.env.USERNAME || '', process.env.PASSWORD || '');
  await expect(page).toHaveURL(/dashboard/i);

  await page.context().storageState({ path: authFile });
});