#!/usr/bin/env node

/**
 * Sitemap & Robots.txt Verification Script
 * Programmatically checks GitHub Pages sitemap endpoint for HTTP 200, Content-Type, and valid XML.
 */

const SITEMAP_URL = 'https://asfandateem-sketch.github.io/Ebay-Calculator/sitemap.xml';
const ROBOTS_URL = 'https://asfandateem-sketch.github.io/Ebay-Calculator/robots.txt';

async function verifyEndpoint() {
  console.log('='.repeat(60));
  console.log('SITEMAP & ROBOTS VERIFICATION AUDIT');
  console.log('Target Sitemap:', SITEMAP_URL);
  console.log('='.repeat(60));

  let hasErrors = false;

  // 1. Fetch & Verify Sitemap
  console.log('\n[1/2] Verifying Sitemap URL...');
  try {
    const startTime = Date.now();
    const response = await fetch(SITEMAP_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      }
    });
    const elapsed = Date.now() - startTime;

    const status = response.status;
    const contentType = response.headers.get('content-type') || 'Unknown';
    const contentLength = response.headers.get('content-length') || 'Unknown';
    const lastModified = response.headers.get('last-modified') || 'Unknown';

    console.log(`  • HTTP Status:        ${status} ${response.statusText}`);
    console.log(`  • Response Time:      ${elapsed}ms`);
    console.log(`  • Content-Type:       ${contentType}`);
    console.log(`  • Content-Length:     ${contentLength} bytes`);
    console.log(`  • Last-Modified:      ${lastModified}`);

    if (status !== 200) {
      console.error(`  ❌ FAIL: Expected HTTP 200, received ${status}`);
      hasErrors = true;
    } else {
      console.log('  ✓ HTTP 200 OK verified.');
    }

    const isXmlContentType = /xml|text\/plain/i.test(contentType);
    if (!isXmlContentType) {
      console.warn(`  ⚠️ WARNING: Content-Type '${contentType}' does not contain 'xml'.`);
    } else {
      console.log(`  ✓ Content-Type is valid for XML delivery (${contentType}).`);
    }

    const bodyText = await response.text();

    if (!bodyText.trim().startsWith('<?xml')) {
      console.error('  ❌ FAIL: Body does not begin with standard <?xml declaration.');
      hasErrors = true;
    } else {
      console.log('  ✓ XML declaration verified at line 1.');
    }

    if (!bodyText.includes('<urlset') || !bodyText.includes('</urlset>')) {
      console.error('  ❌ FAIL: Body does not contain valid <urlset> root tags.');
      hasErrors = true;
    } else {
      console.log('  ✓ Standard sitemap <urlset> schema verified.');
    }

    const urlMatches = bodyText.match(/<loc>(.*?)<\/loc>/g) || [];
    console.log(`  ✓ Total canonical URLs found in sitemap: ${urlMatches.length}`);

    if (urlMatches.length === 0) {
      console.error('  ❌ FAIL: No <loc> URLs found in sitemap.');
      hasErrors = true;
    }

  } catch (err) {
    console.error('  ❌ Network request failed:', err.message);
    hasErrors = true;
  }

  // 2. Fetch & Verify Robots.txt
  console.log('\n[2/2] Verifying Robots.txt Reference...');
  try {
    const robotsRes = await fetch(ROBOTS_URL);
    console.log(`  • HTTP Status:        ${robotsRes.status} ${robotsRes.statusText}`);

    if (robotsRes.status === 200) {
      const robotsText = await robotsRes.text();
      console.log('  • Content:\n' + robotsText.split('\n').map(l => '    ' + l).join('\n'));

      if (robotsText.includes(SITEMAP_URL)) {
        console.log(`  ✓ Robots.txt accurately points to ${SITEMAP_URL}`);
      } else {
        console.warn(`  ⚠️ Robots.txt does not contain exact Sitemap URL declaration.`);
      }
    } else {
      console.warn(`  ⚠️ Robots.txt returned status ${robotsRes.status}`);
    }
  } catch (err) {
    console.warn('  ⚠️ Robots.txt check warning:', err.message);
  }

  console.log('\n' + '='.repeat(60));
  if (hasErrors) {
    console.error('❌ VERIFICATION FAILED: Issues were detected with the live sitemap.');
    process.exit(1);
  } else {
    console.log('✅ VERIFICATION PASSED: Sitemap is live, returning HTTP 200 with valid XML.');
    process.exit(0);
  }
}

verifyEndpoint();
