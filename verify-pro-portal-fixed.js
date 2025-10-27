const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function verifyProPortalFixed() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();

  // Create screenshots directory
  const screenshotsDir = path.join(__dirname, 'verification-screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  const results = {
    login: { success: false, errors: [] },
    dashboard: { success: false, errors: [] },
    quotes: { success: false, errors: [] },
    jobs: { success: false, errors: [] },
    inventory: { success: false, errors: [] },
    orders: { success: false, errors: [] },
    consoleErrors: [],
    summary: { passed: 0, failed: 0 }
  };

  // Collect console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      results.consoleErrors.push({
        text: msg.text(),
        location: msg.location(),
        timestamp: new Date().toISOString()
      });
      console.log('❌ Console Error:', msg.text());
    }
  });

  // Collect page errors
  page.on('pageerror', error => {
    results.consoleErrors.push({
      text: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    console.log('❌ Page Error:', error.message);
  });

  try {
    console.log('\n========================================');
    console.log('   PRO PORTAL VERIFICATION TEST');
    console.log('========================================\n');

    // ============================================
    // Phase 1: Login
    // ============================================
    console.log('📝 Phase 1: Testing Login...');
    try {
      await page.goto('http://localhost:3002/pro/login', { waitUntil: 'networkidle' });
      await page.screenshot({ path: path.join(screenshotsDir, 'v1-login-page.png') });

      // Fill login form
      await page.fill('input[type="email"]', 'mike@tampacoatings.com');
      await page.fill('input[type="password"]', 'demo');

      // Click login button
      await page.click('button[type="submit"]');

      // Wait for navigation to dashboard
      await page.waitForURL('**/pro/dashboard', { timeout: 10000 });
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(screenshotsDir, 'v2-dashboard-after-login.png') });

      results.login.success = true;
      results.summary.passed++;
      console.log('✅ Login: PASSED\n');
    } catch (error) {
      results.login.errors.push(error.message);
      results.summary.failed++;
      console.log('❌ Login: FAILED -', error.message, '\n');
    }

    // ============================================
    // Phase 2: Dashboard
    // ============================================
    console.log('📝 Phase 2: Testing Dashboard...');
    try {
      await page.waitForSelector('text=Performance Overview', { timeout: 5000 });
      await page.screenshot({ path: path.join(screenshotsDir, 'v3-dashboard-content.png') });

      // Check for error messages
      const pageText = await page.textContent('body');
      const hasError = pageText.includes('Something Went Wrong') || pageText.includes('Cannot read');

      if (hasError) {
        throw new Error('Dashboard shows error message');
      }

      results.dashboard.success = true;
      results.summary.passed++;
      console.log('✅ Dashboard: PASSED\n');
    } catch (error) {
      results.dashboard.errors.push(error.message);
      results.summary.failed++;
      console.log('❌ Dashboard: FAILED -', error.message, '\n');
      await page.screenshot({ path: path.join(screenshotsDir, 'v3-dashboard-ERROR.png') });
    }

    // ============================================
    // Phase 3: Quotes Page
    // ============================================
    console.log('📝 Phase 3: Testing Quotes Page...');
    try {
      await page.goto('http://localhost:3002/pro/quotes', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(screenshotsDir, 'v4-quotes-page.png') });

      const pageText = await page.textContent('body');
      const hasError = pageText.includes('Something Went Wrong') || pageText.includes('Cannot read');

      if (hasError) {
        throw new Error('Quotes page shows error message');
      }

      // Check for expected content
      const hasQuotesHeader = pageText.includes('Quotes') || pageText.includes('Customer Requests');
      if (!hasQuotesHeader) {
        throw new Error('Quotes page missing expected content');
      }

      results.quotes.success = true;
      results.summary.passed++;
      console.log('✅ Quotes: PASSED\n');
    } catch (error) {
      results.quotes.errors.push(error.message);
      results.summary.failed++;
      console.log('❌ Quotes: FAILED -', error.message, '\n');
      await page.screenshot({ path: path.join(screenshotsDir, 'v4-quotes-ERROR.png') });
    }

    // ============================================
    // Phase 4: Jobs Page
    // ============================================
    console.log('📝 Phase 4: Testing Jobs Page...');
    try {
      await page.goto('http://localhost:3002/pro/jobs', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(screenshotsDir, 'v5-jobs-page.png') });

      const pageText = await page.textContent('body');
      const hasError = pageText.includes('Something Went Wrong') || pageText.includes('Cannot read');

      if (hasError) {
        throw new Error('Jobs page shows error message');
      }

      // Check for expected content
      const hasJobsHeader = pageText.includes('Job Pipeline') || pageText.includes('Total Active Jobs');
      if (!hasJobsHeader) {
        throw new Error('Jobs page missing expected content');
      }

      results.jobs.success = true;
      results.summary.passed++;
      console.log('✅ Jobs: PASSED\n');
    } catch (error) {
      results.jobs.errors.push(error.message);
      results.summary.failed++;
      console.log('❌ Jobs: FAILED -', error.message, '\n');
      await page.screenshot({ path: path.join(screenshotsDir, 'v5-jobs-ERROR.png') });
    }

    // ============================================
    // Phase 5: Inventory Page
    // ============================================
    console.log('📝 Phase 5: Testing Inventory Page...');
    try {
      await page.goto('http://localhost:3002/pro/inventory', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(screenshotsDir, 'v6-inventory-page.png') });

      const pageText = await page.textContent('body');
      const hasError = pageText.includes('Something Went Wrong') || pageText.includes('Cannot read');

      if (hasError) {
        throw new Error('Inventory page shows error message');
      }

      // Check for expected content
      const hasInventoryHeader = pageText.includes('Product Inventory') || pageText.includes('Showing');
      if (!hasInventoryHeader) {
        throw new Error('Inventory page missing expected content');
      }

      results.inventory.success = true;
      results.summary.passed++;
      console.log('✅ Inventory: PASSED\n');
    } catch (error) {
      results.inventory.errors.push(error.message);
      results.summary.failed++;
      console.log('❌ Inventory: FAILED -', error.message, '\n');
      await page.screenshot({ path: path.join(screenshotsDir, 'v6-inventory-ERROR.png') });
    }

    // ============================================
    // Phase 6: Orders Page (Previously Broken)
    // ============================================
    console.log('📝 Phase 6: Testing Orders Page (CRITICAL - was broken)...');
    try {
      await page.goto('http://localhost:3002/pro/orders', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(screenshotsDir, 'v7-orders-page.png') });

      const pageText = await page.textContent('body');
      const hasError = pageText.includes('Something Went Wrong') || pageText.includes('Cannot read');

      if (hasError) {
        throw new Error('Orders page shows error message');
      }

      // Check for expected content
      const hasOrdersHeader = pageText.includes('Material Orders') || pageText.includes('Total Orders');
      if (!hasOrdersHeader) {
        throw new Error('Orders page missing expected content');
      }

      results.orders.success = true;
      results.summary.passed++;
      console.log('✅ Orders: PASSED (FIXED!) 🎉\n');
    } catch (error) {
      results.orders.errors.push(error.message);
      results.summary.failed++;
      console.log('❌ Orders: FAILED -', error.message, '\n');
      await page.screenshot({ path: path.join(screenshotsDir, 'v7-orders-ERROR.png') });
    }

  } catch (error) {
    console.error('❌ Fatal error:', error);
  }

  // ============================================
  // Final Report
  // ============================================
  console.log('\n========================================');
  console.log('         VERIFICATION RESULTS');
  console.log('========================================\n');

  console.log(`✅ Passed: ${results.summary.passed}/6`);
  console.log(`❌ Failed: ${results.summary.failed}/6`);
  console.log(`📊 Success Rate: ${Math.round((results.summary.passed / 6) * 100)}%\n`);

  if (results.consoleErrors.length > 0) {
    console.log(`⚠️  Console Errors Detected: ${results.consoleErrors.length}`);
  } else {
    console.log('✨ No console errors detected!');
  }

  console.log('\n📁 Screenshots saved to:', screenshotsDir);
  console.log('📄 Results saved to: verification-results.json\n');

  // Save results to file
  fs.writeFileSync(
    path.join(__dirname, 'verification-results.json'),
    JSON.stringify(results, null, 2)
  );

  // Determine overall success
  const allPassed = results.summary.failed === 0;
  if (allPassed) {
    console.log('========================================');
    console.log('   🎉 ALL TESTS PASSED! 🎉');
    console.log('   Pro Portal is fully functional!');
    console.log('========================================\n');
  } else {
    console.log('========================================');
    console.log('   ⚠️  SOME TESTS FAILED');
    console.log('   Review errors above for details');
    console.log('========================================\n');
  }

  // Keep browser open for 10 seconds for manual review
  console.log('Browser will remain open for 10 seconds...');
  await page.waitForTimeout(10000);

  await browser.close();

  // Exit with appropriate code
  process.exit(allPassed ? 0 : 1);
}

verifyProPortalFixed().catch(console.error);
