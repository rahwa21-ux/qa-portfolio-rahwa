import { Builder, By, until, Until } from "selenium-webdriver";

async function testVlidSignup(params) {
  const driver = await new Builder().forBrowser("chrome").build();
  try {
    //open signup page

    await driver.get("https://kuraz.masterkeyconsultplc.com/signup");

    //wait for form
    await driver.wait(until.elementLocated(By.name("name")), 5000);
    //Generate unique email

    const email = `rahwa${Date.now()}@test.com`;

    //Fill form

    await driver.findElement(By.name("name")).sendKeys("Rahwa Test");
    await driver.findElement(By.name("firstname")).sendKeys(email);
    await driver.findElement(By.name("lastname"));
    await driver.findElement(By.name("grade"));
    await driver.findElement(By.name("password"));
  } catch (error) {}
}
