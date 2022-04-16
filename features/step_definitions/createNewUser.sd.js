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
        //console.log(field, ': ', formData[field]);
        const selector = field.toLowerCase()
        await $(`#${selector}`).setValue(formData[field]);
    }
    await $('//*[@type="submit"][text()[contains(.,"Create")]]').click();
    await browser.pause(200);
    
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
