import assert from "node:assert/strict";
import test from "node:test";
import { request as httpRequest } from "node:http";
import { request as httpsRequest } from "node:https";

const base = process.env.SITE_TEST_URL || "http://127.0.0.1:3100";
const canonicalOrigin = "https://cavies.xyz";
const htmlByPath = new Map();
const request = (path, options) => fetch(new URL(path, base), options);
const attribute = (tag, name) =>
  tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];

await test("public sitemap retains the portfolio and includes both new pages", async () => {
  const response = await request("/sitemap.xml");
  assert.equal(response.status, 200);
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  assert.equal(new Set(urls).size, urls.length, "no duplicate sitemap URLs");
  assert.ok(urls.includes(`${canonicalOrigin}/services/business-websites`));
  assert.ok(urls.includes(`${canonicalOrigin}/contact`));
  assert.ok(urls.filter((url) => url.includes("/work/")).length >= 17);
  const titles = new Set();
  const descriptions = new Set();
  for (const url of urls) {
    assert.equal(new URL(url).origin, canonicalOrigin);
    const path = new URL(url).pathname;
    const page = await request(path);
    assert.equal(page.status, 200, path);
    const html = await page.text();
    htmlByPath.set(path, html);
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title, `${path} has a title`);
    assert.ok(!titles.has(title), `${path} has a distinct title`);
    titles.add(title);
    const descriptionTag = html.match(/<meta name="description"[^>]*>/)?.[0];
    const description = attribute(descriptionTag || "", "content");
    assert.ok(description, `${path} has a description`);
    assert.ok(
      !descriptions.has(description),
      `${path} has a distinct description`,
    );
    descriptions.add(description);
    const canonicalTag = html.match(/<link rel="canonical"[^>]*>/)?.[0];
    assert.equal(
      new URL(attribute(canonicalTag || "", "href")).href,
      new URL(url).href,
      path,
    );
    const openGraphTag = html.match(/<meta property="og:url"[^>]*>/)?.[0];
    assert.equal(
      new URL(attribute(openGraphTag || "", "content")).href,
      new URL(url).href,
      path,
    );
    assert.equal(
      (html.match(/<h1(?:\s|>)/g) || []).length,
      1,
      `${path} has one H1`,
    );
    assert.ok(!/<meta name="robots" content="[^"]*noindex/.test(html), path);
    for (const json of html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs,
    )) {
      assert.doesNotThrow(() => JSON.parse(json[1]), `${path} JSON-LD parses`);
    }
  }
});

await test("homepage exposes both buyer journeys and keeps verification", () => {
  const html = htmlByPath.get("/");
  assert.ok(html.includes("Discuss your website"));
  assert.ok(html.includes('href="/contact"'));
  assert.ok(html.includes('href="/services/business-websites"'));
  assert.ok(html.includes('href="/work/seitrace"'));
  assert.ok(html.includes('href="/work/beigman-engineering"'));
  assert.ok(html.includes('name="google-site-verification"'));
});

await test("service and Beigman pages expose real scope and useful links in HTML", () => {
  const service = htmlByPath.get("/services/business-websites");
  assert.ok(service.includes("Australia"));
  assert.ok(service.includes('href="/work/beigman-engineering"'));
  assert.ok(service.includes('href="/contact"'));
  assert.ok(service.includes("<details"), "FAQs work without JavaScript");
  const casePage = htmlByPath.get("/work/beigman-engineering");
  assert.ok(casePage.toLowerCase().includes("ongoing maintenance"));
  assert.ok(casePage.includes("SEO support"));
  assert.ok(casePage.includes('href="/services/business-websites"'));
});

await test("contact route renders honest email and Telegram fallbacks without JavaScript", () => {
  const html = htmlByPath.get("/contact");
  assert.ok(html.includes("contact@cavies.xyz"));
  assert.ok(html.includes("mailto:contact@cavies.xyz"));
  assert.ok(html.includes("https://t.me/tincavies"));
  assert.ok(html.includes("<noscript"));
});

await test("missing routes are real noindex 404s", async () => {
  const response = await request("/this-page-does-not-exist");
  assert.equal(response.status, 404);
  assert.ok((await response.text()).includes('content="noindex"'));
});

await test("robots retains the canonical sitemap", async () => {
  const response = await request("/robots.txt");
  assert.equal(response.status, 200);
  assert.ok((await response.text()).includes(`${canonicalOrigin}/sitemap.xml`));
});

await test("canonical host redirects preserve path and query", async () => {
  for (const host of ["www.cavies.xyz", "cavies-studio.vercel.app"]) {
    const url = new URL("/services/business-websites?source=test", base);
    const response = await new Promise((resolve, reject) => {
      const makeRequest =
        url.protocol === "https:" ? httpsRequest : httpRequest;
      const req = makeRequest(url, { headers: { host } }, (res) => {
        res.resume();
        resolve({ status: res.statusCode, location: res.headers.location });
      });
      req.on("error", reject);
      req.end();
    });
    assert.equal(response.status, 308);
    assert.equal(
      response.location,
      `${canonicalOrigin}/services/business-websites?source=test`,
    );
  }
});
