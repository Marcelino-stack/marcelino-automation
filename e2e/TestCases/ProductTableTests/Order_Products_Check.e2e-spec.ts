import { expect, test } from '@playwright/test';
import {Constants} from "../../Modules/Helpers/constants";

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Y42/);

    // start with Login
    await page.locator('text=email').fill(Constants.TestingEmail);
    await page.locator('text=Password').fill(Constants.TestingEmail);
    await page.locator('text=Submit').click()
});


test(`Testing if sorting stock is supported`, async ({page}) => {
    console.log("")
    console.log("STARTING TEST..")
    //clicking in the stock row to check if the sorting works
    await page.locator('text=Stock').click()
    //get the first column of the products
    console.log("Getting row from products")
    const rowStock = page.locator(
        `xpath=//y42-products/div/y42-product-list/ag-grid-angular/div/div[1]/div[2]/div[3]/div[2]/div/div/div/div[4]`);
    // get all and the row of stock and put it on a list
    let arrayList = new Array();
    //getting each number from the price list
    for (let i=0; i<await rowStock.count(); i++){
        console.log(await rowStock.nth(i).textContent())
        arrayList.fill(await rowStock.nth(i).textContent());
        await rowStock.nth(i).click()
        if (i <= await rowStock.count()-2) {
            await rowStock.nth(i).isEnabled().then(
                value => {
                    rowStock.nth(i).scrollIntoViewIfNeeded();
                }
            )
        }
    }
    //sorting in ascending the list of prices
    let sortedArray = arrayList.sort((n1,n2) => n1 - n2)
    //checking if the list it was already in ascending
    expect(sortedArray, "Error sorted has not been done correctly from the button").toEqual(arrayList);
});

