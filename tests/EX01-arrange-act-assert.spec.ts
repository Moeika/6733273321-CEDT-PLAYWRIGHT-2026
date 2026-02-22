import { test, expect } from '@playwright/test';

test.describe('Cura Healthcare Service - Login Tests', () => {

  test.beforeEach(async ({ page }) => {
    //Navigate
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
    await page.click('#btn-make-appointment');
  });

  //Valid
  test('Verify login pass with valid user', async ({ page }) => {
    const username = 'John Doe';
    const password = 'ThisIsNotAPassword';

    await page.fill('#txt-username', username);
    await page.fill('#txt-password', password);
    await page.click('#btn-login');

    await expect(page).toHaveURL(/#appointment/);
    await expect(page.locator('h2')).toHaveText('Make Appointment');
  });

  //Invalid Password
  test('Verify login fail with invalid password', async ({ page }) => {
    const username = 'John Doe';
    const password = 'ThisIsAPassword';

    await page.fill('#txt-username', username);
    await page.fill('#txt-password', password);
    await page.click('#btn-login');

    const errorMessage = page.locator('.text-danger');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Login failed!');
  });

  //Invalid Username
  test('Verify login fail with invalid username', async ({ page }) => {
    const username = 'Jane Doe';
    const password = 'ThisIsNotAPassword';

    await page.fill('#txt-username', username);
    await page.fill('#txt-password', password);
    await page.click('#btn-login');

    const errorMessage = page.locator('.text-danger');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Login failed!');
  });

});