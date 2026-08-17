import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountPage extends BasePage {

    //#region Account Information Locators

    public readonly welcomeMessage: Locator =
        this.page.locator('strong', {
            hasText: 'Welcome',
        });

    public readonly accountNumber: Locator =
        this.page.locator('div.center strong').first();

    public readonly accountBalance: Locator =
        this.page.locator('div.center strong').nth(1);

    public readonly accountCurrency: Locator =
        this.page.locator('div.center strong').nth(2);

    //#endregion

    //#region Deposit Locators

    private readonly depositTab: Locator =
        this.page.locator('button[ng-click="deposit()"]');

    private readonly depositAmountInput: Locator =
        this.page.locator(
            '.form-group:has-text("Amount to be Deposited") input'
        );

    private readonly depositButton: Locator =
        this.page.locator('button[type="submit"]', {
            hasText: 'Deposit',
        });

    public readonly depositSuccessMessage: Locator =
        this.page.getByText('Deposit Successful', {
            exact: true,
        });

    //#endregion

    //#region Withdrawal Locators

    private readonly withdrawTab: Locator =
        this.page.getByRole('button', {
            name: 'Withdrawl',
            exact: true,
        });

    private readonly withdrawAmountInput: Locator =
        this.page.locator(
            '.form-group:has-text("Amount to be Withdrawn") input'
        );

    private readonly withdrawButton: Locator =
        this.page.getByRole('button', {
            name: 'Withdraw',
            exact: true,
        });

    public readonly withdrawalSuccessMessage: Locator =
        this.page.getByText('Transaction successful', {
            exact: true,
        });

    //#endregion

    //#region Transaction Locators

    private readonly transactionsTab: Locator =
        this.page.getByRole('button', {
            name: 'Transactions',
            exact: true,
        });

    private readonly transactionRows: Locator =
        this.page.locator('table tbody tr');

    //#endregion

    //#region Logout Locators

    public readonly logoutButton: Locator =
        this.page.getByRole('button', {
            name: 'Logout',
            exact: true,
        });

    //#endregion

    //#region Account Methods

    public async getAccountBalance(): Promise<number> {
        const balanceText = await this.accountBalance.textContent();

        if (!balanceText) {
            throw new Error('Account balance not found');
        }

        return Number(balanceText.trim());
    }

    //#endregion

    //#region Deposit Methods

    public async clickDepositTab(): Promise<void> {
        await this.clickElement(this.depositTab);
    }

    public async enterDepositAmount(amount: number): Promise<void> {
        await this.fillField(
            this.depositAmountInput,
            amount.toString()
        );
    }

    public async clickDepositButton(): Promise<void> {
        await this.clickElement(this.depositButton);
    }

    public async getDepositValidationMessage(): Promise<string> {
        return await this.depositAmountInput.evaluate(
            (element: HTMLInputElement) => element.validationMessage
        );
    }

    //#endregion

    //#region Withdrawal Methods

    public async clickWithdrawTab(): Promise<void> {
        await this.clickElement(this.withdrawTab);
    }

    public async enterWithdrawalAmount(amount: number): Promise<void> {
        await this.fillField(
            this.withdrawAmountInput,
            amount.toString()
        );
    }

    public async clickWithdrawButton(): Promise<void> {
        await this.clickElement(this.withdrawButton);
    }

    //#endregion

    //#region Transaction Methods

    public async clickTransactionsTab(): Promise<void> {
        await this.clickElement(this.transactionsTab);
    }

    public getTransactionRow(amount: number): Locator {
        return this.transactionRows.filter({
            hasText: amount.toString(),
        });
    }

     //#endregion

    // #region Logout Methods

    public async clickLogoutButton(): Promise<void>{
        await this.clickElement(this.logoutButton);
    }

     //#endregion

}
//#endregion