import {BasePage} from "./BasePage";
import { Locator, Page } from "@playwright/test";

export class SearchPage extends BasePage{
    private readonly searchHeader : Locator;
    private readonly searchResultCount : Locator;

constructor(page: Page){
    super(page);
    this.searchHeader = page.getByRole('heading', { name: 'Search - macbook' })
    this.searchResultCount = page.locator('.product-thumb')
};

async verifysearchHeader(): Promise<boolean>{
    return await this.searchHeader.isVisible();
}

async verifysearchResultCount(): Promise<number>{
    return await this.searchResultCount.count();
}
async VerifyProductSearch(searchText: string):Promise<void>{
    // exact match + scoped to product names: "MacBook" must not also match "MacBook Air"/"MacBook Pro"
    await this.page.locator('.product-thumb h4').getByRole('link', { name: searchText, exact: true }).click();

}
}