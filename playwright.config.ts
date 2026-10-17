import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 60000,
  fullyParallel: false,
  workers: 2,
  retries: 0,
  reporter: [["list"], ["json", { outputFile: "docs/e2e-results.json" }]],
  use: {
    baseURL: process.env.BASE_URL || "http://127.0.0.1:4162",
    browserName: "chromium",
    launchOptions: {
      executablePath: process.env.CI ? undefined : "/usr/bin/chromium",
      args: ["--no-sandbox"],
    },
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop-1440", use: { viewport: { width: 1440, height: 1000 } } },
    { name: "tablet-768", use: { viewport: { width: 768, height: 1024 } } },
    {
      name: "mobile-390",
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: "mobile-320",
      use: {
        viewport: { width: 320, height: 740 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "npm run preview -- --port 4162",
        url: "http://127.0.0.1:4162",
        reuseExistingServer: !process.env.CI,
      },
});
