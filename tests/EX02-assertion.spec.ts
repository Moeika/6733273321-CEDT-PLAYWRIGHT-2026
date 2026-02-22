import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // 2. Navigate and login with valid user
  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  await page.click('#btn-make-appointment');
  await page.fill('#txt-username', 'John Doe');
  await page.fill('#txt-password', 'ThisIsNotAPassword');
  await page.click('#btn-login');
});

test('Verify Appointment Form assertions', async ({ page }) => {
  //Verify h2 display
  const heading = page.locator('h2');
  await expect(heading).toHaveText('Make Appointment');

  //Verify facility combo boxes
  const facilitySelect = page.locator('#combo_facility');
  await facilitySelect.selectOption('Hongkong CURA Healthcare Center');
  await expect(facilitySelect).toHaveValue('Hongkong CURA Healthcare Center');
  
  await facilitySelect.selectOption('Seoul CURA Healthcare Center');
  await expect(facilitySelect).toHaveValue('Seoul CURA Healthcare Center');

  //Verify hospital readmission checkbox
  const checkbox = page.locator('#chk_hospotal_readmission');
  await checkbox.check();
  await expect(checkbox).toBeChecked();

  //Verify health care program radio button
  const radioMedicaid = page.locator('#radio_program_medicaid');
  await radioMedicaid.check();
  await expect(radioMedicaid).toBeChecked();

  //Verify input current date on Visit Date
  const today = new Date().toLocaleDateString('en-GB'); // Formats as DD/MM/YYYY
  const dateInput = page.locator('#txt_visit_date');
  await dateInput.fill(today);
  await expect(dateInput).toHaveValue(today);

  //Verify input comment
  const commentBox = page.locator('#txt_comment');
  await commentBox.fill('Value-added automated test comment.');
  await expect(commentBox).toHaveValue('Value-added automated test comment.');

  //Verify book appointment button is displayed and enabled
  const bookButton = page.locator('#btn-book-appointment');
  await expect(bookButton).toBeVisible();
  await expect(bookButton).toBeEnabled();
});