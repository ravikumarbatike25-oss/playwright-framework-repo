import { Locator, Page } from "@playwright/test";

export class BasePage{

    protected readonly page: Page;
    // Common locators across all pages
    //Base page class is a parent class for all pages.
    //It contains the common methods and properties for all pages.
    //It is used to avoid code duplication.
    //It is used to avoid code duplication.
    //common locators on all pages like header, footer, sidebar, etc.

protected readonly logo: Locator;
protected readonly searchBox: Locator;
protected readonly searchIcon: Locator;
protected readonly footerLinks: Locator;
protected readonly currency: Locator;
protected readonly cartButton: Locator;

constructor(page: Page) {
    this.page = page;

    this.logo = page.getByAltText('naveenopencart');
    this.searchBox = page.getByPlaceholder('Search');
    this.searchIcon = page.locator('div#search button');
    this.currency = page.locator('#form-currency');
    this.footerLinks = page.locator('footer a');
    this.cartButton = page.locator('div#cart button');
}
//common methods on all pages like click, fill, select, etc.
async isLogoVisible(): Promise<boolean> {
    return await this.logo.isVisible();
}
async isSearchBoxVisible(): Promise<boolean> {
    return await this.searchBox.isVisible();
}
async isSearchIconVisible(): Promise<boolean> {
    return await this.searchIcon.isVisible();
}
async isFooterLinksVisible(): Promise<number> {
     return await this.footerLinks.count();
}
async isCurrencyVisible(): Promise<boolean> {
    return await this.currency.isVisible();
}
async isCartButtonVisible(): Promise<boolean> {
    return await this.cartButton.isVisible();
}
async isFooterLinksText(): Promise<string[]> {
    return await this.footerLinks.allTextContents();
}
//common properties on all pages like title, url, etc.
async getpageTitle(): Promise<string> {
    return await this.page.title();
}
async getpageUrl(): Promise<string> {
    return this.page.url();
}
async getpageSource(): Promise<string> {
    return await this.page.content();
}
async pageloadtime(): Promise<void> {
    return await this.page.waitForLoadState('load');
}
    //common actions on all pages like login, logout, etc.
    //common assertions on all pages like assertTitle, assertUrl, assertText, etc.
    //common validations on all pages like validateTitle, validateUrl, validateText, etc.
    //common errors on all pages like errorTitle, errorUrl, errorText, etc.
    //common logs on all pages like logTitle, logUrl, logText, etc.
    }
