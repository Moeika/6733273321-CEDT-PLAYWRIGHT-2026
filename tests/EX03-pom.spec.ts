import { test, expect } from '@playwright/test';
import { AppointmentPage } from '../page-objects/AppointmentPage.ts';
import * as dotenv from 'dotenv';

dotenv.config();

test('should successfully make an appointment', async ({ page }) => {
  const appointmentPage = new AppointmentPage(page);

  await appointmentPage.navigate();

  await appointmentPage.login(
    "John Doe", 
    "ThisIsNotAPassword"
  );

  await appointmentPage.fillAppointmentDetails('Hongkong CURA Healthcare Center', '18/8/2027');

  const confirmation = page.locator('h2');
  await expect(confirmation).toHaveText('Appointment Confirmation');
});