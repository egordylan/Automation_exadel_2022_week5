const { When, Then, Given } = require('@cucumber/cucumber');
const YAML = require('yaml');
const timeout = 20000;

When('I login into system as: {string}, {string}', async function (login, password) {
    await $('#login').setValue(login);
    await $('#password').setValue(password);
    await $('button').click();
    await $('#spinner').waitForDisplayed({reverse: false, timeout: timeout});
    await $('#spinner').waitForDisplayed({reverse: true, timeout: timeout});
    await $('#user-label').waitForDisplayed({timeoutMsg: 'cannot login into system'});
});

When('I wait {string} for displayed', async function(item){
    const userLabel = await $('#user-label');
    expect(await userLabel.getText()).toEqual(item)
});

When('I go to the {string} menu item', async function (item) {
    await $(`//a[text()[contains(.,"${item}")]]`).click();
    const url = await browser.getUrl();
    await expect(url).toMatch('https://viktor-silakov.github.io/course-sut/formUser.html');
});

When(/^I fill the form:$/, async function (formYaml) {
    const formData = YAML.parse(formYaml);
    console.log({ formData });
    for (const field in formData) {
        const selector = field.toLowerCase()
        await $(`#${selector}`).setValue(formData[field]);
    }
    await $('//*[@type="submit"][text()[contains(.,"Create")]]').click();
    
});

Then('Check the user: {string}', async function(item) {
    await $('//*[text()[contains(.,"List of Users")]]').waitForExist({reverse: false, timeout: 5000});
    const url = await browser.getUrl();
    await expect(url).toMatch('https://viktor-silakov.github.io/course-sut/Users.html');

    const email = await $(`//*[text()="${item}"]/..`);
    const emailText = await email.$('(.//div[@class="tabulator-cell"])[1]').getText();
    await expect(item).toEqual(emailText)
    console.log(emailText);
    await browser.pause(2000);
});

Then('Check the address1, address2, city and zip: {string}, {string}, {string}, {string}', async function(addr1, addr2, city, zip) {
    await $('//*[text()[contains(.,"List of Users")]]').waitForExist({reverse: false, timeout: 5000});
    const url = await browser.getUrl();
    await expect(url).toMatch('https://viktor-silakov.github.io/course-sut/Users.html');

    const address1 = await $(`//*[text()="${addr1}"]/..`);
    const address1Text = await address1.$('(.//div[@class="tabulator-cell"])[3]').getText();
    await expect(addr1).toEqual(address1Text)
    console.log(address1Text);

    const address2 = await $(`//*[text()="${addr2}"]/..`);
    const address2Text = await address2.$('(.//div[@class="tabulator-cell"])[4]').getText();
    await expect(addr2).toEqual(address2Text)
    console.log(address2Text);

    const cityData = await $(`//*[text()="${city}"]/..`);
    const cityText = await cityData.$('(.//div[@class="tabulator-cell"])[5]').getText();
    await expect(city).toEqual(cityText)
    console.log(cityText);

    const zipData = await $(`//*[text()="${zip}"]/..`);
    const zipText = await zipData.$('(.//div[@class="tabulator-cell"])[7]').getText();
    await expect(zip).toEqual(zipText)
    console.log(zipText);
});

Then('Check the {string}', async function(item) {
    await $('//*[text()[contains(.,"List of Users")]]').waitForExist({reverse: false, timeout: 5000});
    const url = await browser.getUrl();
    await expect(url).toMatch('https://viktor-silakov.github.io/course-sut/Users.html');

    const description = await $(`//*[text()="${item}"]/..`);
    const descriptionText = await description.$('(.//div[@class="tabulator-cell"])[8]').getText();
    await expect(item).toEqual(descriptionText)
    console.log(descriptionText);
});