import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductInfoPage extends BasePage {

    // Private Locators
    private readonly header: Locator;
    private readonly productImages: Locator;
    private readonly productMetaData: Locator;
    private readonly productPricing: Locator;
    private map:Map<string, string| number > ;

    // Constructor
    constructor(page: Page) {
        super(page);
        this.header = page.locator('div#content h1');
        this.productImages = page.locator('div#content ul img');
        this.productMetaData = page.locator('div#content ul.list-unstyled').nth(0);
        this.productPricing = page.locator('div#content ul.list-unstyled').nth(1);
        this.map = new Map<string, string | number>();
    }


async headerText(): Promise<string> {
    return await this.header.innerText();
}
async verifyproductImagescount():Promise<number> {
    await this.productImages.first().waitFor({state: 'visible'});
    return await this.productImages.count();
}

//This method will return the product information in a map
async getProductinfo(){
  this.map.set('Productnames',await this.headerText());
  this.map.set('Productimages',await this.verifyproductImagescount());
  await this.checkproductdata(); //it demonstrates how to collect dynamic UI data and store it in a Map.
  await this.checkproductpricing();
  return this.map;
 
}

//Checking product data
private async checkproductdata(): Promise<void> {
    let metaData = await this.productMetaData.allInnerTexts();
    for (let data of metaData) {
        let meta = data.split(':');
        let metaKey = meta[0].trim();
        let metaVal = meta[1].trim();
        this.map.set(metaKey, metaVal);
    }
}

// $2,000.00
// Ex Tax: $2,000.00
private async checkproductpricing(): Promise<void> {
    let priceData = await this.productPricing.allInnerTexts();
    let productPrice = priceData[0].trim();
    //let exTaxPrice = priceData[1].split(':')[1].trim();
    let exTaxPrice = priceData[1]?.split(':')[1]?.trim() ?? '';
    this.map.set('ProductPrice', productPrice);
    this.map.set('ExTaxPrice', exTaxPrice);
}
}