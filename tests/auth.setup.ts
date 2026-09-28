import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.pom';

const authFile = 'auth.json';

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('admin@test.com', '1234');
    await page.context().storageState({ path: authFile });
});
