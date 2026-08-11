import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';
import customerData from '../test-data/customers.json';

test.describe('Banking Application', () => {

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
            path: 'screenshots/01-after-login.png',
            fullPage: true,
        });
    });

    test('should allow customer to deposit $100', async ({ page }) => {

        await accountPage.clickDepositTab();

        await accountPage.enterDepositAmount(
            customerData.depositAmount
        );

        await accountPage.clickDepositButton();

        await expect(accountPage.depositSuccessMessage)
            .toHaveText('Deposit Successful');

        await page.screenshot({
            path: 'screenshots/02-after-deposit.png',
            fullPage: true,
        });

        await page.reload();

        await accountPage.clickTransactionsTab();

        const depositTransaction =
            accountPage.getTransactionRow(
                customerData.depositAmount
            );

        await expect(depositTransaction)
            .toContainText(
                customerData.depositAmount.toString()
            );

        await expect(depositTransaction)
            .toContainText('Credit');

        await page.screenshot({
            path: 'screenshots/03-transactions.png',
            fullPage: true,
        });
    });

    test('should allow customer to withdraw money', async ({ page }) => {

        await accountPage.clickDepositTab();

        await accountPage.enterDepositAmount(
            customerData.depositAmount
        );

        await accountPage.clickDepositButton();

        await expect(accountPage.depositSuccessMessage)
            .toHaveText('Deposit Successful');

        const balanceBefore =
            await accountPage.getAccountBalance();

        await accountPage.clickWithdrawTab();

        await accountPage.enterWithdrawalAmount(
            customerData.withdrawalAmount
        );

        await accountPage.clickWithdrawButton();

        await expect(accountPage.withdrawalSuccessMessage)
            .toHaveText('Transaction successful');

        await page.screenshot({
            path: 'screenshots/04-after-withdraw.png',
            fullPage: true,
        });

        const balanceAfter =
            await accountPage.getAccountBalance();

        expect(balanceAfter)
            .toBe(
                balanceBefore -
                customerData.withdrawalAmount
            );
    });

    test('should not allow a deposit with an empty amount', async () => {

        await accountPage.clickDepositTab();

        await accountPage.clickDepositButton();

        const validationMessage =
            await accountPage.getDepositValidationMessage();

        expect(validationMessage)
            .toBe('Please fill out this field.');
    });

});