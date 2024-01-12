import { test, expect } from '@playwright/test';

test('lead conversion', async ({ page }) => {
  test.setTimeout(120000);
  await page.locator('body').click();
  await page.goto('https://acn-1d4-dev-ed.develop.my.salesforce.com/');
  await page.waitForLoadState('load');

  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('testautotraining@acn.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Doublemint3');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.waitForLoadState('load');
  
  await page.getByRole('button', { name: 'App Launcher' }).click();
  await page.getByPlaceholder('Search apps and items...').click();
  await page.getByPlaceholder('Search apps and items...').fill('sales');
  await page.getByRole('option', { name: 'Sales', exact: true }).click();
  await page.getByRole('link', { name: 'Leads' }).click();
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByPlaceholder('First Name').click();
  await page.getByPlaceholder('First Name').fill('Leadcon');
  await page.getByPlaceholder('Last Name').click();
  await page.getByPlaceholder('Last Name').fill('Test');
  await page.getByLabel('*Company').click();
  await page.getByLabel('*Company').fill('Testing Factory');
  await page.getByLabel('Lead Status, Open - Not').click();
  await page.getByTitle('Working - Contacted').click();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.getByRole('tab', { name: 'Details' }).click();
  await page.getByRole('button', { name: 'Show more actions' }).click();
  await page.getByRole('menuitem', { name: 'Convert' }).click();
  await page.getByRole('button', { name: 'Convert', exact: true }).click();

  await page.close();
});