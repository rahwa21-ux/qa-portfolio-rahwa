import { Builder, By, until } from "selenium-webdriver";
import LoginPage from "../pages/LoginPage.js";
import { users } from "../data/testData.js";
import fs from "fs";

const driver = await new Builder().forBrowser("chrome").build();
const login = new LoginPage(driver);

try {
  driver.manage().window().maximize();

  // ======================
  // TASK 1 - VALID LOGIN
  // ======================
  await login.open();
  await login.login(users.validUser.email, users.validUser.password);

  // Wait 3 seconds to let any AJAX complete
  await driver.sleep(3000);

  // Check current URL
  let currentUrl = await driver.getCurrentUrl();
  console.log("Current URL after login attempt:", currentUrl);

  // Check for any visible error messages (common classes)
  const possibleErrorSelectors = [
    ".error-message",
    ".alert-danger",
    ".invalid-feedback",
    ".error",
    "[role='alert']",
    ".notification-error",
  ];
  let errorFound = false;
  for (const selector of possibleErrorSelectors) {
    const errors = await driver.findElements(By.css(selector));
    if (errors.length > 0 && (await errors[0].isDisplayed())) {
      const errorText = await errors[0].getText();
      console.error(`❌ Login error (${selector}):`, errorText);
      errorFound = true;
      break;
    }
  }

  // ✅ FIX: Take screenshot HERE before throwing error
  if (errorFound) {
    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync("login-captcha-error.png", screenshot, "base64");
    console.log("📸 Screenshot saved as login-captcha-error.png");
    throw new Error("Login failed due to error message on page");
  }

  // If no error, wait for dashboard URL
  try {
    await driver.wait(until.urlContains("/iam/dashboard"), 20000);
    console.log("✅ Task 1 Passed - Successful Login");
  } catch (timeoutError) {
    // This runs only if no error but also no redirect
    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync("login-timeout.png", screenshot, "base64");
    console.log("📸 Screenshot saved as login-timeout.png");
    throw new Error(`Login failed - still at ${currentUrl} after 20s`);
  }

  // ======================
  // TASK 2 - INVALID LOGIN
  // ======================
  await login.open();
  await login.login(users.invalidUser.email, users.invalidUser.password);

  // Wait for error message
  const errorElement = await driver.wait(
    until.elementLocated(By.className("error-message")),
    10000,
  );
  const errorText = await errorElement.getText();
  if (!errorText) {
    throw new Error("❌ Error message not displayed");
  }
  console.log("✅ Task 2 Passed - Invalid Login Error Shown");

  // ======================
  // TASK 3 - EMPTY FORM
  // ======================
  await login.open();
  await login.submitEmptyForm();

  const validation = await driver.wait(
    until.elementLocated(By.id("username-error")),
    10000,
  );
  const validationText = await validation.getText();
  if (!validationText) {
    throw new Error("❌ Validation message not shown");
  }
  console.log("✅ Task 3 Passed - Empty Form Validation Works");
} catch (error) {
  console.error("❌ Test Failed:", error.message);
} finally {
  await driver.quit();
}
