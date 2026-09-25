const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function respectfulSequence() {
    const urls = [
        "https://example.com/page-1",
        "https://example.com/page-2",
        "https://example.com/page-3"
    ];

    console.log("These URLs are examples only. This script does not request them.\n");

    for (const [index, url] of urls.entries()) {
        console.log(`${index + 1}. Prepare request for ${url}`);
        await sleep(500);
    }

    console.log("\nA responsible scraper:");
    console.log("1. Reads the terms and permission rules.");
    console.log("2. Chooses an official API when one exists.");
    console.log("3. Requests only necessary pages.");
    console.log("4. Delays between requests.");
    console.log("5. Identifies the crawler when required.");
    console.log("6. Handles failures without bypassing restrictions.");
    console.log("7. Stores only data it is allowed to keep.");
}

respectfulSequence();
