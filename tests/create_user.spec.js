import { test, expect } from '@playwright/test';

function getRandomString(length) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return result;
}

function getRandomEmail() {
  const username = getRandomString(8); 
  const domain = 'acn.com'; 
  return `${username}@${domain}`;
}

test('create user', async ({ page }) => {
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

  await page1.getByPlaceholder('Quick Find').click();
  await page1.getByPlaceholder('Quick Find').fill('Users');
  await page1.getByRole('link', { name: 'Users' }).click();
  await page1.getByLabel('Setup Tree').getByRole('group').getByRole('link', { name: 'Users' }).click();
  await expect(page1).toHaveURL('https://acn-1d4-dev-ed.develop.lightning.force.com/lightning/setup/ManageUsers/home')

  const frNewButton = await page1.frameLocator("//iframe").locator("//div[@class='pbHeader']//input[@value='New User']");
  await frNewButton.click();

  const randomEmail = getRandomEmail();

  await page1.frameLocator("//iframe").locator("//div[@class='pbBody']").getByLabel('First Name').click();
  await page1.frameLocator("//iframe").locator("//div[@class='pbBody']").getByLabel('First Name').fill('Ariana');
  await page1.frameLocator("//iframe").locator("//div[@class='pbBody']").getByLabel('*Last Name').click();
  await page1.frameLocator("//iframe").locator("//div[@class='pbBody']").getByLabel('*Last Name').fill('Venti');
  await page1.frameLocator("//iframe").locator("//div[@class='pbBody']").getByLabel('*Email', { exact: true }).click();
  await page1.frameLocator("//iframe").locator("//div[@class='pbBody']").getByLabel('*Email', { exact: true }).fill(randomEmail);
  await page1.frameLocator("//iframe").locator("//div[@class='pbBody']").getByLabel('*Username', ).click();
  await page1.frameLocator("//iframe").locator("//div[@class='pbBody']").getByLabel('*Username').fill(randomEmail);
  await page1.frameLocator("//iframe").locator("//div[@class='pbBody']").getByLabel('*User License').selectOption('Identity');
  await page1.frameLocator("//iframe").locator("//div[@class='pbBody']").locator('#role').selectOption('CEO');

  const frSaveButton = await page1.frameLocator("//iframe").locator("//div[@class='pbBottomButtons']//input[@name='save']");
  await frSaveButton.click();

  await page.close();
});
