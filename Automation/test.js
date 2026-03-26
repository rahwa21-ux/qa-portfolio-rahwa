import { Builder, By, Key, until } from "selenium-webdriver";

const driver = await new Builder().forBrowser("chrome").build();

try {
  // Open website
  await driver.get("https://www.google.com");

  // Find search box
  const searchBox = await driver.findElement(By.name("q"));

  // Type and press enter
  await searchBox.sendKeys("Selenium testing", Key.RETURN);

  // Wait until title contains word
  await driver.wait(until.titleContains("Selenium"), 5000);
} finally {
  // Close browser
  await driver.quit();
}
