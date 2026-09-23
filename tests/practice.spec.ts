import { test, expect } from '@playwright/test';

test("User login", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("textbox", { name: "you@example.com" }).fill('admin@test.com');
    await page.getByRole("textbox", { name: "Enter password" }).fill("1234")
    await page.getByRole("button", { name: "Login" }).click();
    const profileHeader = await page.getByRole("heading", { name: "Profile" }).textContent();
    await expect(profileHeader?.includes("Profile"));
    //await expect(page.getByRole('heading')).toContainText('Profile');
    await page.context().storageState({ path: "auth.json" });
})
test("Double Button click", async ({ page }) => {
    await page.goto("/dashboard/practice-components");
    let alertMessage = "";
    await page.on('dialog', async dialog => {
        alertMessage = dialog.message();
        await dialog.accept();
    })
    await page.getByRole("button", { name: "Double Click Me" }).dblclick();
    console.log(alertMessage);
})
test("Context Button click", async ({ page }) => {
    await page.goto("/dashboard/practice-components");
    let alertMessage = "";
    await page.on('dialog', async dialog => {
        alertMessage = dialog.message();
        await dialog.accept();
    })
    await page.getByRole("button", { name: "Right Click Me" }).click({button:'right'});
    console.log(alertMessage);
})