import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';
import customerData from '../test-data/customers.json';

test.describe('Logout functionality', () => {
    let loginPage: LoginPage;
    let accountPage: AccountPage;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        accountPage = new AccountPage(page);

        await loginPage.navigateTo('#/login');

        await loginPage.clickCustomerLoginButton();

        await loginPage.selectCustomer(
            customerData.customerName
        );

        await loginPage.clickLoginButton();

        await expect(accountPage.welcomeMessage)
            .toContainText(
                `Welcome ${customerData.customerName}`
            );

        await page.screenshot({
            path: 'screenshots/05-after-login.png',
            fullPage: true,
        });
    });
    test('Logout sucessfully', async ({ page }) => {
        await expect(accountPage.logoutButton).toBeVisible();
        await accountPage.clickLogoutButton();
        await expect(loginPage.customerDropdown).toBeVisible();
        await expect(loginPage.yourNameLabel).toHaveText('Your Name :');
        await page.screenshot({
            path: 'screenshots/06-after-logout.png',
            fullPage: true,
        });
    });

})