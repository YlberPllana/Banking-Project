import { Locator, Page } from '@playwright/test';

export abstract class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async navigateTo(url: string): Promise<void> {
        try {
            await this.page.goto(url);
        } catch (error) {
            console.error(`Failed to navigate to: ${url}`, error);
            throw error;
        }
    }

    public async clickElement(locator: Locator): Promise<void> {
        try {
            await locator.click();
        } catch (error) {
            console.error('Error while clicking element:', locator, error);
            throw error;
        }
    }

    public async fillField(locator: Locator, text: string): Promise<void> {
        try {
            await locator.fill(text);
        } catch (error) {
            console.error('Error while filling field:', locator, error);
            throw error;
        }
    }
}