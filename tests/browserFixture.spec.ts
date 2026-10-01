import { test, expect } from "@playwright/test"
import { BrowserContext, Page } from "@playwright/test"
import { SUITES } from "../utils/suites";

let browserContext: BrowserContext;
let page: Page;

test.describe("Practice Automation", () => {
    test.describe.configure({ mode: "serial" })
    test.beforeAll(async ({ browser }) => {
        browserContext = await browser.newContext({ storageState: 'auth.json' });
        page = await browserContext.newPage();

    })
    test.afterAll(async () => {
        await browserContext.close();
    })
    test("Visit Practice Site",{tag:SUITES.smoke}, async () => {
        await page.goto("/dashboard/practice-components")
    })

    test("Double Button click",{tag:SUITES.smoke}, async () => {
        let alertMessage = "";
        await page.on('dialog', async dialog => {
            alertMessage = dialog.message();
            await dialog.accept();
        })
        await page.getByRole("button", { name: "Double Click Me" }).dblclick();
        console.log(alertMessage);
    })
    test("Open Modal", async () => {
        await page.goto("/dashboard/practice-components");
        await page.locator(".btn.btn-success").click();
        const modal = await page.getByRole("dialog");
        await expect(modal).toBeVisible();
        const modalText = await modal.textContent();
        console.log(modalText)
        await modal.getByRole("button", { name: "Close" }).nth(0).click();
        await expect(modal).not.toBeVisible();
    })
    test("NextJS Datetime input",{tag:SUITES.smoke}, async () => {
        await page.goto("/dashboard/practice-components");
        const dateTimeElem = await page.locator("[type=datetime-local]");
        await dateTimeElem.fill('2025-08-25T18:30');

    })
    test("React DatePicker", async () => {
        await page.goto("/dashboard/practice-components");
        const reactDatePicker = await page.getByPlaceholder("Select date");
        await reactDatePicker.click();
        await reactDatePicker.fill("08/15/2026");
        await page.keyboard.press("Enter");
        console.log(await reactDatePicker.inputValue());

    })

    test("Handle iFrame",{tag:SUITES.smoke}, async () => {
        await page.goto("/dashboard/practice-components");
        const frame = await page.frameLocator('iframe');
        await frame.getByRole("textbox", { name: "you@example.com" }).fill('admin@test.com');
        await frame.getByRole("textbox", { name: "Enter password" }).fill("1234")
        await frame.getByRole("button", { name: "Login" }).click();
    })
})

