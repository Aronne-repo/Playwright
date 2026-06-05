import {defineConfig} from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {timeout: 5000},
  use: {baseURL: 'https://opensource-demo.orangehrmlive.com/'},
  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: {
        storageState: '.auth/user.json',
        headless: true,
        viewport: {width: 1280, height: 720},
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry'
      }
    }]
});