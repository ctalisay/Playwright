import { test, expect } from '@playwright/test';

test('Create Account and Contact', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://acn-1d4-dev-ed.develop.my.salesforce.com/');
  await page.getByLabel('Username').fill('testautotraining@acn.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Doublemint3');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.waitForLoadState('load');

  await expect (page).toHaveURL('https://acn-1d4-dev-ed.develop.lightning.force.com/lightning/setup/SetupOneHome/home');
  await page.getByRole('button', { name: 'App Launcher' }).click();
  await page.getByPlaceholder('Search apps and items...').click();
  await page.getByPlaceholder('Search apps and items...').fill('service');
  await page.getByRole('option', { name: 'Service Console' }).click();
  await page.getByLabel('Show Navigation Menu').click();
  await page.getByRole('option', { name: 'Accounts' }).click();
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByLabel('*Account Name').click();
  await page.getByLabel('*Account Name').fill('Create Account Test');
  await page.getByLabel('Type, --None--').click();
  await page.getByTitle('Prospect').click();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.waitForLoadState('load');
  await page.getByRole('tab', { name: 'Details' }).click();
  await page.getByRole('tab', { name: 'Related' }).click();
  await page.getByLabel('Contacts').getByRole('button', { name: 'New' }).click();
  await page.waitForLoadState('load');
  await page.getByPlaceholder('First Name').click();
  await page.getByPlaceholder('First Name').fill('Test');
  await page.getByPlaceholder('Last Name').click();
  await page.getByPlaceholder('Last Name').fill('Contact');
  await page.getByRole('button', { name: 'Save', exact: true }).click();

  await page.close();

});