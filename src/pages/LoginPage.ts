import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    //locators declaration
    private readonly emailId: Locator ;
    private readonly Password: Locator;
    private readonly loginBtn: Locator;
    private readonly forgotpswd: Locator;
    private readonly loginerror: Locator;
//constructor initialization
constructor (page:Page) {
    super(page);
    //locators initialization
    this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
    this.Password = page.getByRole('textbox', { name: 'Password' });
    this.loginBtn = page.getByRole('button', { name: 'Login' });
    this.forgotpswd = page.getByRole('link', { name: 'Forgotten Password' }).first()
    this.loginerror =page.locator('.alert.alert-danger.alert-dismissible')
};

//public methods
async navigateToLoginPage(): Promise<void>{
    await this.page.goto('opencart/index.php?route=account/login')
};

async verifyForgotPassword(): Promise<boolean>{
    return await this.forgotpswd.isEnabled();
}

async verifyLoginBtn(): Promise<boolean>{
    return await this.loginBtn.isVisible();
}

async doLogin(email: string, password: string): Promise<void>{
    await this.emailId.fill(email);
    await this.Password.fill(password);
    await this.loginBtn.click();
}

async isLogininvaliderror(): Promise<boolean>{
    return await this.loginBtn.isVisible();
}
}

