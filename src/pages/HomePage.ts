import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class Homepage extends BasePage {
    //locators declaration

    private readonly myAccount: Locator;
    private readonly editAccount: Locator;
    private readonly logOut: Locator;
    private readonly headers: Locator;
    //private readonly searchField : Locator;
    



//constructor initialization
constructor (page:Page) {
    super(page);
    //locators initialization
    this.myAccount = page.locator('#column-right').getByRole('link', { name: 'My Account' })
    this.editAccount = page.getByRole('link', { name: 'Edit Account' })
    this.logOut= page.getByRole('link', { name: 'Logout' })
    this.headers = page.getByRole('heading', { level: 2 })
    //this.searchField = page.getByRole('textbox', { name: 'Search' })
    
 
};

//public methods
async verifymyAccountLink(): Promise<boolean>{
    return await this.myAccount.isVisible();
};
async verifylogoutLink(): Promise<boolean>{
    return await this.logOut.isEnabled();
};
async verifyeditAccountLink(): Promise<boolean>{
    return await this.editAccount.isVisible();
};
 async verifynumberOfHeaders(): Promise<string[]>{
    return await this.headers.allInnerTexts();
};
async verifysearchfieldbox(searchText: string): Promise<void>{
    await this.searchBox.fill(searchText);
};
async verifysearchIcon(): Promise<void>{
await this.searchIcon.click();
};
}

