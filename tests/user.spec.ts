import { test, expect } from '@playwright/test';
import {faker} from "@faker-js/faker";
import { generateRandomNumber } from '../utils/randomNumber';

test("Add new user",async({page})=>{
    await page.goto("/dashboard/add-user");
    await page.getByRole("textbox",{name:"John", exact: true}).fill("Test");
    await page.getByRole("textbox",{name:"Doe"}).fill("User 1");
    let email=faker.internet.email();
    let randomId=generateRandomNumber(1000000,9999999);
    
    await page.getByRole("textbox",{name:"john@example.com"}).fill(email);
    await page.getByPlaceholder("01500000000").fill(`0150${randomId}`);
    const cbBloodGroup= await page.getByRole("combobox").first();
    await cbBloodGroup.click();
    await cbBloodGroup.press("ArrowDown");
    await cbBloodGroup.press("Enter")
    await page.getByRole("textbox",{name:"Create a password"}).fill("1234");
    const txtBirthDate= await page.getByPlaceholder("MM/dd/yyyy");
    await txtBirthDate.click();
    await txtBirthDate.selectText();
    await txtBirthDate.press("Backspace");
    await txtBirthDate.pressSequentially("01/01/2005",{ delay: 150 });
    await txtBirthDate.press("Enter");
    await page.getByRole("combobox").nth(1).selectOption("Dhaka");
    await page.getByRole("radio",{name:"Male",exact:true}).check();
    await page.getByRole("checkbox").check();
    await page.locator("#photoInput").setInputFiles("resources/logo.png");
    await page.getByRole('button', { name: 'Create User' }).click();
    await expect(page).toHaveURL("/dashboard/users");

})