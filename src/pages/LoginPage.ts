import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

    //#region Login Page Locators

    private readonly customerLoginButton: Locator =
        this.page.getByRole('button', {
            name: 'Customer Login',
        });

    private readonly customerDropdown: Locator =
        this.page.locator('#userSelect');

    private readonly loginButton: Locator =
        this.page.getByRole('button', {
            name: 'Login',
            exact: true,
        });

    //#endregion

    //#region Login Page Methods

    public async clickCustomerLoginButton(): Promise<void> {
        await this.clickElement(this.customerLoginButton);
    }

    public async selectCustomer(customerName: string): Promise<void> {
        await this.customerDropdown.selectOption({
            label: customerName,
        });
    }

    public async clickLoginButton(): Promise<void> {
        await this.clickElement(this.loginButton);
    }

    //#endregion
}