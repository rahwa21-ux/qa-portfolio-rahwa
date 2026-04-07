import { Builder, By } from "selenium-webdriver";
import assert from "assert";

const driver = await new Builder().forBrowser("chrome").build();

try {
  await driver.get("http://localhost:3000/");

  const navItems = [
    { label: "Home", type: "url", value: "/" },
    { label: "Features", type: "section", value: "features" },
    { label: "Grades", type: "section", value: "grades" },
    { label: "Pricing", type: "url", value: "/pricing" },
    { label: "Contact", type: "url", value: "/contact" },
  ];

  for (let item of navItems) {
    console.log(`\n🔍 Testing: ${item.label}`);

    const link = await driver.findElement(By.linkText(item.label));
    await link.click();

    await driver.sleep(1500);

    // URL check
    if (item.type === "url") {
      const currentUrl = await driver.getCurrentUrl();

      assert(
        currentUrl.includes(item.value),
        `${item.label} navigation failed`,
      );

      console.log(`✅ PASS: ${item.label} navigates correctly`);
    }

    // Section check
    if (item.type === "section") {
      const section = await driver.findElement(By.id(item.value));
      const isVisible = await section.isDisplayed();

      assert(isVisible, `${item.label} section not visible after click`);

      console.log(`✅ PASS: ${item.label} scrolls correctly`);
    }
  }
} catch (error) {
  console.log("❌ Test Failed:", error.message);
} finally {
  await driver.quit();
}
