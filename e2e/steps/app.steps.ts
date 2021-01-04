import {Given, Then} from 'cucumber';

import {AppPage} from '../src/app.po';
import * as chai from 'chai';

const expect = chai.expect;

const page = new AppPage();

Given('I navigated to the home page', async () => {
  // Write code here that turns the phrase above into concrete actions
  await page.navigateTo();
});

Then('the page title text should be {string}', async (title) => {
  // Write code here that turns the phrase above into concrete actions
  expect(await page.getTitleText()).to.equal(title);
});
