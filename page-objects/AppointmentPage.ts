import { Page, Locator } from '@playwright/test';

export class AppointmentPage {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly facilitySelect: Locator;
  readonly bookButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.locator('#btn-make-appointment');
    this.usernameInput = page.locator('#txt-username');
    this.passwordInput = page.locator('#txt-password');
    this.facilitySelect = page.locator('#combo_facility');
    this.bookButton = page.locator('#btn-book-appointment');
  }

  async navigate() {
    await this.page.goto(process.env.BASE_URL!);
  }

  async login(user: string, pass: string) {
    await this.loginButton.click();
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.page.click('#btn-login');
  }

  async fillAppointmentDetails(facility: string, date: string) {
    await this.facilitySelect.selectOption(facility);
    await this.page.locator('.checkbox-inline').click();
    await this.page.locator('#radio_program_medicaid').click();
    await this.page.waitForTimeout(1000);
    await this.page.$eval('#txt_visit_date', (el: HTMLInputElement, v) => {
      el.value = v;
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }, date);
    await this.bookButton.click();
  }
}