
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

const columnNumber = ['1', '2','3', '6'];
for (const num of columnNumber) {
    test(`Testing random element from Column ${num}`, async ({page}) => {
        console.log("")
        console.log(`STARTING TEST ON COLUMN NUMBER ${num}..`)
        //get the first column of the products
        console.log("Getting row from products")
        const rowTitle = page.locator(
            `xpath=//y42-products/div/y42-product-list/ag-grid-angular/div/div[1]/div[2]/div[3]/div[2]/div/div/div/div[${num}]`);
        //get all the elements and generate a random number between the range of the max number of elements
        let randomRow = Math.floor(await rowTitle.count() - 1);
        // click on the random element
        console.log(`Double clicking in the random selected cell ${randomRow +1}`)
        await rowTitle.nth(randomRow).dblclick();
        // wait for the pop-up
        console.log('wait for the shipping pop-up')
        await expect(page.locator(
            'xpath=//y42-product-detail/form/mat-card/mat-card-header/div/mat-card-title'
        )).toHaveText('Shipping Information');
        // check the title field so we know it is editable
        console.log('check the title field')
        let title = await page.locator('xpath=//mat-card-content/div[1]/div/mat-form-field/div/div[1]/div/input')
        await expect(title).toBeEditable();
        //fill the field
        console.log("Writting "+ Constants.TestingName+ " on title")
        await title.fill(Constants.TestingName)
        // check the Description field so we know it is editable
        console.log('check the description field')
        let description = await page.locator('xpath=//mat-card/mat-card-content/div[2]/div/mat-form-field/div/div[1]/div/textarea');
        await expect(description).toBeEditable();
        //fill the field
        console.log("Writting "+ Constants.TestingName+ " on description")
        await description.fill(Constants.TestingName)
        // check the Price field so we know it is editable
        console.log('check the price field')
        let price = await page.locator('xpath=//mat-card-content/div[3]/div[1]/mat-form-field/div/div[1]/div/input');
        await expect(price).toBeEditable();
        // check the Stock field so we know it is editable
        console.log('check the stock field')
        let stock = await page.locator('xpath=//mat-card/mat-card-content/div[3]/div[2]/mat-form-field/div/div[1]/div/input');
        await expect(stock).toBeEditable();
        console.log('check the brand field')
        let brand = await page.locator('#brand');
        await expect(brand).toBeEditable();
        console.log("Writting "+ Constants.TestingName+ " on brand")
        //fill the field
        await brand.fill(Constants.TestingName)
        // get atribute submit button
        console.log('checking the submit button if it is enabled')
        let submitButtonAtribute = await page.locator('button', { hasText: 'Submit'}).getAttribute("ng-reflect-disabled");
        // checking if the disable atribute is false
        await expect(submitButtonAtribute, "Error submit button was disabled").toEqual("false")
    });
}

    test(`correctly validates the input form `, async ({page}) => {
        console.log("")
        console.log(`STARTING TEST INPUT FORM VALIDATION..`)
        //get the first column of the products
        console.log("Getting row from products")
        const rowTitle = page.locator(
            `xpath=//y42-products/div/y42-product-list/ag-grid-angular/div/div[1]/div[2]/div[3]/div[2]/div/div/div/div[1]`);

        //get all the elements and generate a random number between the range of the max number of elements
        let randomRow = Math.floor(await rowTitle.count() - 1);
        // click on the random element
        console.log(`Double clicking in the random selected cell ${randomRow}`)
        await rowTitle.nth(randomRow).dblclick();
        // wait for the pop-up
        console.log('wait for the shipping pop-up')
        await expect(page.locator(
            'xpath=//y42-product-detail/form/mat-card/mat-card-header/div/mat-card-title'
        )).toHaveText('Shipping Information');

        // check the title field validation
        console.log('check the title field')
        let title = await page.locator('xpath=//mat-card-content/div[1]/div/mat-form-field/div/div[1]/div/input')
        await title.fill("")
        let submitButtonAtribute = await page.locator('button', { hasText: 'Submit'}).getAttribute("ng-reflect-disabled");
        // checking if the disable atribute is true
        console.log(submitButtonAtribute)
        await expect(await submitButtonAtribute, "Error submit button was enabled, it can not be empty").toEqual("true")

        console.log("Writting "+ Constants.TestingName+ " on title")
        await title.fill(Constants.TestingName)
        submitButtonAtribute = await page.locator('button', { hasText: 'Submit'}).getAttribute("ng-reflect-disabled");
        // checking if the disable atribute is false
        await expect(await submitButtonAtribute, "Error submit button was disabled").toEqual("false")

        // check the Description field so we know it is editable
        console.log('check the description field')
        let description = await page.locator('xpath=//mat-card/mat-card-content/div[2]/div/mat-form-field/div/div[1]/div/textarea');
        await description.fill("")
        submitButtonAtribute = await page.locator('button', { hasText: 'Submit'}).getAttribute("ng-reflect-disabled");
        // checking if the disable atribute is true
        console.log(submitButtonAtribute)
        await expect(await submitButtonAtribute, "Error submit button was enabled, description can not be empty").toEqual("true")

        console.log("Writting "+ Constants.TestingName+ " on description")
        await description.fill(Constants.TestingName)
        submitButtonAtribute = await page.locator('button', { hasText: 'Submit'}).getAttribute("ng-reflect-disabled");
        // checking if the disable atribute is false
        await expect(await submitButtonAtribute, "Error submit button was disabled").toEqual("false")

        // check the Price field so we know it is editable
        console.log('check the price field')
        let price = await page.locator('xpath=//mat-card-content/div[3]/div[1]/mat-form-field/div/div[1]/div/input');
        await price.fill(Constants.TestingName)
        submitButtonAtribute = await page.locator('button', { hasText: 'Submit'}).getAttribute("ng-reflect-disabled");
        // checking if the disable atribute is true
        console.log(submitButtonAtribute)
        await expect(await submitButtonAtribute, "Error submit button was enabled, price can not be characters").toEqual("true")
        await price.fill("")
        submitButtonAtribute = await page.locator('button', { hasText: 'Submit'}).getAttribute("ng-reflect-disabled");
        // checking if the disable atribute is true
        console.log(submitButtonAtribute)
        await expect(await submitButtonAtribute, "Error submit button was enabled, price  can not be empty").toEqual("true")

        console.log("Writting "+ Constants.TestingName+ " on price")
        await price.fill("15")
        submitButtonAtribute = await page.locator('button', { hasText: 'Submit'}).getAttribute("ng-reflect-disabled");
        // checking if the disable atribute is false
        await expect(await submitButtonAtribute, "Error submit button was disabled").toEqual("false")

        // check the Stock field so we know it is editable
        console.log('check the stock field')
        let stock = await page.locator('xpath=//mat-card/mat-card-content/div[3]/div[2]/mat-form-field/div/div[1]/div/input');
        await stock.fill(Constants.TestingName)
        submitButtonAtribute = await page.locator('button', { hasText: 'Submit'}).getAttribute("ng-reflect-disabled");
        // checking if the disable atribute is true
        console.log(submitButtonAtribute)
        await expect(await submitButtonAtribute, "Error submit button was enabled, stock can not be characters").toEqual("true")
        await price.fill("")
        submitButtonAtribute = await page.locator('button', { hasText: 'Submit'}).getAttribute("ng-reflect-disabled");
        // checking if the disable atribute is true
        console.log(submitButtonAtribute)
        await expect(await submitButtonAtribute, "Error submit button was enabled, stock  can not be empty").toEqual("true")

        console.log("Writting "+ Constants.TestingName+ " on stock")
        await price.fill("15")
        submitButtonAtribute = await page.locator('button', { hasText: 'Submit'}).getAttribute("ng-reflect-disabled");
        // checking if the disable atribute is false
        await expect(await submitButtonAtribute, "Error submit button was disabled").toEqual("false")

    });

const stockAndPriceColumns = ['4', '5'];
for (const num of stockAndPriceColumns) {
    test(`Testing random element direct editing from Column ${num}`, async ({page}) => {
        console.log("")
        console.log("STARTING TEST..")
        //get the first column of the products
        console.log("Getting row from products")
        const rowTitle = page.locator(
            `xpath=//y42-products/div/y42-product-list/ag-grid-angular/div/div[1]/div[2]/div[3]/div[2]/div/div/div/div[${num}]`);
        //get all the elements and generate a random number between the range of the max number of elements
        let randomRow = Math.floor(await rowTitle.count() - 1);
        const count = await rowTitle.count()
        // click on the random element
        console.log(`Double clicking in the random selected cell ${randomRow}`)
        await rowTitle.nth(randomRow).dblclick();
        // checking if it is editable
        console.log("checking random cell if it is editable")
        await expect(rowTitle.nth(randomRow)).toBeEditable();
    });
}
