const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function investigateProPortal() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();

  // Create screenshots directory
  const screenshotsDir = path.join(__dirname, 'investigation-screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  const results = {
    login: null,
    dashboard: null,
    quotes: null,
    jobs: null,
    inventory: null,
    orders: null,
    consoleErrors: [],
    pageErrors: []
  };

  // Collect console messages
  page.on('console', msg => {
    if (msg.type() === 'error') {
      results.consoleErrors.push({
        text: msg.text(),
        location: msg.location()
      });
      console.log('Console Error:', msg.text());
    }
  });

  // Collect page errors
  page.on('pageerror', error => {
    results.pageErrors.push({
      message: error.message,
      stack: error.stack
    });
    console.log('Page Error:', error.message);
  });

  try {
    console.log('\n=== Phase 1: Login ===');
    await page.goto('http://localhost:3002/pro/login');
    await page.screenshot({ path: path.join(screenshotsDir, '01-login-page.png') });

    // Fill login form
    await page.fill('input[type="email"]', 'mike@tampacoatings.com');
    await page.fill('input[type="password"]', 'demo');
    await page.screenshot({ path: path.join(screenshotsDir, '02-login-filled.png') });

    // Click login button
    await page.click('button[type="submit"]');

    // Wait for navigation
    await page.waitForURL('**/pro/dashboard', { timeout: 10000 });
    console.log('✅ Login successful - redirected to dashboard');
    results.login = { success: true, url: page.url() };

    await page.waitForTimeout(2000); // Wait for dashboard to load
    await page.screenshot({ path: path.join(screenshotsDir, '03-dashboard-initial.png') });

    console.log('\n=== Phase 2: Testing Navigation Links ===');

    // Test Dashboard link
    console.log('\nTesting: Dashboard link');
    try {
      const dashboardLink = page.locator('nav a[href="/pro/dashboard"]');
      await dashboardLink.click();
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(screenshotsDir, '04-dashboard-clicked.png') });
      results.dashboard = {
        success: true,
        url: page.url(),
        errors: results.consoleErrors.length
      };
      console.log('✅ Dashboard link works');
    } catch (error) {
      results.dashboard = { success: false, error: error.message };
      console.log('❌ Dashboard link failed:', error.message);
    }

    // Test Quotes link
    console.log('\nTesting: Quotes link');
    results.consoleErrors = []; // Reset
    try {
      const quotesLink = page.locator('nav a[href="/pro/quotes"]');
      await quotesLink.click();
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(screenshotsDir, '05-quotes-page.png') });

      // Check for error messages on page
      const errorText = await page.textContent('body').catch(() => '');

      results.quotes = {
        success: !errorText.includes('Error'),
        url: page.url(),
        errors: results.consoleErrors.length,
        pageContent: errorText.substring(0, 500)
      };

      if (errorText.includes('Error')) {
        console.log('❌ Quotes page has errors');
        console.log('Page text preview:', errorText.substring(0, 300));
      } else {
        console.log('✅ Quotes page loads');
      }
    } catch (error) {
      results.quotes = { success: false, error: error.message };
      console.log('❌ Quotes link failed:', error.message);
    }

    // Test Jobs link
    console.log('\nTesting: Jobs link');
    results.consoleErrors = []; // Reset
    try {
      const jobsLink = page.locator('nav a[href="/pro/jobs"]');
      await jobsLink.click();
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(screenshotsDir, '06-jobs-page.png') });

      const errorText = await page.textContent('body').catch(() => '');

      results.jobs = {
        success: !errorText.includes('Error'),
        url: page.url(),
        errors: results.consoleErrors.length,
        pageContent: errorText.substring(0, 500)
      };

      if (errorText.includes('Error')) {
        console.log('❌ Jobs page has errors');
        console.log('Page text preview:', errorText.substring(0, 300));
      } else {
        console.log('✅ Jobs page loads');
      }
    } catch (error) {
      results.jobs = { success: false, error: error.message };
      console.log('❌ Jobs link failed:', error.message);
    }

    // Test Inventory link
    console.log('\nTesting: Inventory link');
    results.consoleErrors = []; // Reset
    try {
      const inventoryLink = page.locator('nav a[href="/pro/inventory"]');
      await inventoryLink.click();
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(screenshotsDir, '07-inventory-page.png') });

      const errorText = await page.textContent('body').catch(() => '');

      results.inventory = {
        success: !errorText.includes('Error'),
        url: page.url(),
        errors: results.consoleErrors.length,
        pageContent: errorText.substring(0, 500)
      };

      if (errorText.includes('Error')) {
        console.log('❌ Inventory page has errors');
        console.log('Page text preview:', errorText.substring(0, 300));
      } else {
        console.log('✅ Inventory page loads');
      }
    } catch (error) {
      results.inventory = { success: false, error: error.message };
      console.log('❌ Inventory link failed:', error.message);
    }

    // Test Orders link
    console.log('\nTesting: Orders link');
    results.consoleErrors = []; // Reset
    try {
      const ordersLink = page.locator('nav a[href="/pro/orders"]');
      await ordersLink.click();
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(screenshotsDir, '08-orders-page.png') });

      const errorText = await page.textContent('body').catch(() => '');

      results.orders = {
        success: !errorText.includes('Error'),
        url: page.url(),
        errors: results.consoleErrors.length,
        pageContent: errorText.substring(0, 500)
      };

      if (errorText.includes('Error')) {
        console.log('❌ Orders page has errors');
        console.log('Page text preview:', errorText.substring(0, 300));
      } else {
        console.log('✅ Orders page loads');
      }
    } catch (error) {
      results.orders = { success: false, error: error.message };
      console.log('❌ Orders link failed:', error.message);
    }

  } catch (error) {
    console.error('Fatal error:', error);
    results.fatalError = error.message;
  }

  // Save results to file
  fs.writeFileSync(
    path.join(__dirname, 'investigation-results.json'),
    JSON.stringify(results, null, 2)
  );

  console.log('\n=== Investigation Complete ===');
  console.log('Screenshots saved to:', screenshotsDir);
  console.log('Results saved to: investigation-results.json');

  // Keep browser open for manual inspection
  console.log('\nBrowser will remain open for 30 seconds for manual inspection...');
  await page.waitForTimeout(30000);

  await browser.close();
}

investigateProPortal().catch(console.error);
