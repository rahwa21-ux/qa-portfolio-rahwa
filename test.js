import { Builder, By, Key, until } from "selenium-webdriver";

const driver = await new Builder().forBrowser("chrome").build();

try {
  // Open website
  await driver.get("https://www.google.com");

  // Find search box
  const searchBox = await driver.findElement(By.name("q"));

  // Type and press enter
  await searchBox.sendKeys("Selenium testing Rahwa", Key.RETURN);

  // Wait until title contains word
  await driver.wait(until.titleContains("Rahwa"), 10000);
  // Get the actual title
  const title = await driver.getTitle();
  console.log("Page Title is", title);

  // Flexible assertion
  {
    if (title.includes("Rahwa")) {
      console.log("Test Passes: Title matches");
    } else {
      console.log("Title not Mactched");
    }
  }

  //Exact assertion

  {
    /*const expectedTitle = "Selenium testing Rahwa - Google Search";

  if (expectedTitle === title) {
    console.log("titla page Matches");
  } else console.log(`Expected: "${expectedTitle}"`);
  console.log(`Actual : "${title}"`);
  console.log("Title not matched");*/
  }
} finally {
  await driver.quit();
}
