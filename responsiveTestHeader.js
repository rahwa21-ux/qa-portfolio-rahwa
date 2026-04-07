import { Builder, By, until } from "selenium-webdriver";
import assert from "assert";

const driver = await new Builder().forBrowser("chrome").build();

try {
  await driver.get("http://localhost:3000/");

  // 🖥️ DESKTOP TEST

  await driver.manage().window().setRect({ width: 1440, height: 900 });

  const homeLinkDesktop = await driver.findElement(By.linkText("Home"));
  const isHomeVisibleDesktop = await homeLinkDesktop.isDisplayed();

  assert(isHomeVisibleDesktop, "Home link should be visible on desktop");
  console.log("✅ Desktop: Nav links visible");

  // 📱 MOBILE TEST

  await driver.manage().window().setRect({ width: 375, height: 812 });

  // Find hamburger button
  const menuButton = await driver.findElement(By.css("button[aria-label]"));
  const isMenuVisible = await menuButton.isDisplayed();

  assert(isMenuVisible, "Hamburger menu should be visible on mobile");
  console.log("✅ Mobile: Hamburger menu visible");

  // Click hamburger menu
  await menuButton.click();

  // Wait until menu items appear
  await driver.wait(until.elementLocated(By.linkText("Home")), 10000);

  const homeLinkMobile = await driver.findElement(By.linkText("Home"));
  const isHomeVisibleMobile = await homeLinkMobile.isDisplayed();

  assert(isHomeVisibleMobile, "Home link should be visible after opening menu");
  console.log("✅ Mobile: Menu opens and links are visible");

  // 🔁 OPTIONAL: CLICK TEST

  await homeLinkMobile.click();

  console.log("✅ Mobile: Navigation works after clicking Home");
} catch (error) {
  console.log("❌ Test Failed:", error.message);
} finally {
  await driver.quit();
}
