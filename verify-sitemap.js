import fetch from 'node-fetch';

const SITEMAP_URL = 'https://asfandateem-sketch.github.io/Ebay-Calculator/sitemap.xml';

async function verifySitemap() {
  console.log(`Performing GET request to: ${SITEMAP_URL}`);

  try {
    const response = await fetch(SITEMAP_URL, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      }
    });

    const status = response.status;
    const contentType = response.headers.get('content-type') || '';

    console.log(`HTTP Status Code: ${status}`);
    console.log(`Content-Type Header: ${contentType}`);

    const isStatusOk = status === 200;
    const isContentTypeXml = contentType.includes('application/xml');

    if (isStatusOk) {
      console.log('✓ Status Check Passed: HTTP status is 200.');
    } else {
      console.error(`❌ Status Check Failed: Expected 200, got ${status}.`);
    }

    if (isContentTypeXml) {
      console.log("✓ Content-Type Check Passed: Header includes 'application/xml'.");
    } else {
      console.error(`❌ Content-Type Check Failed: Header does not include 'application/xml' (received: '${contentType}').`);
    }

    if (isStatusOk && isContentTypeXml) {
      console.log('\n✅ All checks passed successfully!');
    } else {
      console.error('\n❌ One or more verification checks failed.');
      process.exitCode = 1;
    }
  } catch (error) {
    console.error('❌ Error during fetch request:', error);
    process.exitCode = 1;
  }
}

verifySitemap();
