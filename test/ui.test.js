const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('UI Testing Using Selenium', function() {
    this.timeout(30000);

    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });

    it('should load the login page', async function() {
        await driver.get("D:/ppmpl/PPMPL_4/selenium-ui-test/login.html");

        const title = await driver.getTitle();
        expect(title).to.equal('Login Page');
    });

    it('should input username and password', async function() {
        await driver.findElement(By.id('username')).sendKeys('testuser');
        await driver.findElement(By.id('password')).sendKeys('password123');
        const usernameValue = await driver.findElement(By.id('username')).getAttribute('value');
        const passwordValue = await driver.findElement(By.id('password')).getAttribute('value');
        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    it('should click the login button', async function() {
        await driver.findElement(By.id('loginButton')).click();
    });

    // Latihan 1: Validasi Login Gagal
    it('should display an error message on failed login', async function() {
        await driver.findElement(By.id('username')).clear();
        await driver.findElement(By.id('password')).clear();
        
        // Simulate incorrect login
        await driver.findElement(By.id('username')).sendKeys('wronguser');
        await driver.findElement(By.id('password')).sendKeys('wrongpassword');
        await driver.findElement(By.id('loginButton')).click();

        // Assume the error message has an ID of 'errorMessage'
        const errorMessage = await driver.findElement(By.id('errorMessage')).getText();
        expect(errorMessage).to.equal('Invalid username or password');
    });

    // Latihan 2: Penggunaan CSS Selector dan XPath
    it('should input username and password using CSS Selector and XPath', async function() {
        await driver.findElement(By.css('#username')).sendKeys('testuser');
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('password123');

        const usernameValue = await driver.findElement(By.css('#username')).getAttribute('value');
        const passwordValue = await driver.findElement(By.xpath('//*[@id="password"]')).getAttribute('value');
        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    // Latihan 3: Validasi Visual
    it('should ensure the login button and input fields are displayed', async function() {
        const isUsernameDisplayed = await driver.findElement(By.id('username')).isDisplayed();
        const isPasswordDisplayed = await driver.findElement(By.id('password')).isDisplayed();
        const isLoginButtonDisplayed = await driver.findElement(By.id('loginButton')).isDisplayed();

        expect(isUsernameDisplayed).to.be.true;
        expect(isPasswordDisplayed).to.be.true;
        expect(isLoginButtonDisplayed).to.be.true;
    });
});
