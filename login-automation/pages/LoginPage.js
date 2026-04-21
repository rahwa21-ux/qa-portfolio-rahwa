import { By, until } from "selenium-webdriver";

class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  async open() {
    await this.driver.get(
      "https://megp-bo.dev.peragosystems.com/iam/auth/login",
    );
  }

  async login(email, password) {
    const emailInput = await this.driver.wait(
      until.elementLocated(By.name("username")),
      15000,
    );
    await emailInput.clear();
    await emailInput.sendKeys(email.trim());

    const passwordInput = await this.driver.wait(
      until.elementLocated(By.css('input[type="password"]')),
      15000,
    );
    await passwordInput.clear();
    await passwordInput.sendKeys(password);

    const button = await this.driver.wait(
      until.elementLocated(By.css('button[type="submit"]')),
      15000,
    );
    await this.driver.wait(until.elementIsEnabled(button), 15000);
    await this.driver.wait(until.elementIsVisible(button), 15000);

    console.log("👉 Submitting form with JavaScript click...");
    // Use JavaScript click – it's the most reliable when normal click fails
    await this.driver.executeScript("arguments[0].click();", button);
  }

  async submitEmptyForm() {
    const button = await this.driver.wait(
      until.elementLocated(By.css('button[type="submit"]')),
      15000,
    );
    await this.driver.wait(until.elementIsEnabled(button), 15000);
    await this.driver.executeScript("arguments[0].click();", button);
  }
}

export default LoginPage;
