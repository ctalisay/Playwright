import { test, expect } from '@playwright/test';

test('Deactivate User', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://acn-1d4-dev-ed.develop.my.salesforce.com/');
  await page.getByLabel('Username').fill('testautotraining@acn.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Doublemint3');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.waitForLoadState('load');
 
  await page.goto('https://acn-1d4-dev-ed.develop.lightning.force.com/lightning/setup/SetupOneHome/home');
  await page.locator('a').filter({ hasText: /^Setup$/ }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('menuitem', { name: 'Setup Opens in a new tab', exact: true }).click();
  
  const page1 = await page1Promise;
  await page1.getByPlaceholder('Search Setup').click();
  await page1.getByPlaceholder('Search Setup').fill('ariana venti');
  await page1.getByRole('option', { name: 'Ariana Venti User' }).first().click();

  const frEditButton = await page1.frameLocator("//iframe").locator("//div[@class='pbHeader']//input[@name='edit']");
  await frEditButton.click();

  await page1.frameLocator("//iframe").locator("//div[@class='pbBody']").getByLabel('Active').uncheck();
  await page1.frameLocator("//iframe").locator('#simpleDialog0Content').click();
  await page1.frameLocator("//iframe").locator('div').filter({ hasText: /^OK$/ }).click();
 
  await page1.frameLocator("//iframe").locator("//div[@class='pbBottomButtons']").locator('input[name="save"]').click();

  await page.close();



});