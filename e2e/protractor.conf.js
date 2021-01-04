// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {SpecReporter, StacktraceOption} = require('jasmine-spec-reporter');
const reporter = require('cucumber-html-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    // './src/**/*.e2e-spec.ts',
    './features/*.feature'
  ],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ["--headless", "--disable-gpu"]
    }
  },
  directConnect: true,
  SELENIUM_PROMISE_MANAGER: false,
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: ['./steps/*.steps.ts'],
    format: 'json:./results.json',
  },
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {
    }
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    // jasmine.getEnv().addReporter(new SpecReporter({
    //   spec: {
    //     displayStacktrace: StacktraceOption.PRETTY
    //   }
    // }));
  },
  onComplete: async () => {
    await browser.waitForAngularEnabled(false);
    const capabilities = await browser.getCapabilities();

    const options = {
      theme: 'bootstrap',
      jsonFile: './results.json',
      output: `reports/cucumber_report_${capabilities.get('browserName')}.html`,
      reportSuiteAsScenarios: true,
      scenarioTimestamp: true,
      launchReport: false,
      metadata: {
        "App Version": "0.3.2",
        "Test Environment": "STAGING",
        "Browser": capabilities.get("browserName") + " " + capabilities.get('version'),
        "Platform": capabilities.get('platform'),
        // "Kernel": os.version()
      }
    };

    reporter.generate(options);
  }
};
