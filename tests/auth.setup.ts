import {test as setup, expect} from '@playwright/test';
import {LoginPage} from '../pages/login_page';

const authFile = '.auth/user.json';
//URL is visible in the code to show purpose only
const USERNAME = 'Admin'
const PASSWORD = 'admin123'

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login(USERNAME, PASSWORD);
  await expect(page).toHaveURL(/dashboard\/index/i);

  await page.context().storageState({ path: authFile });
});