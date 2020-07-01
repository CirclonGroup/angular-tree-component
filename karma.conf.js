// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const { join } = require('path');
const { constants } = require('karma');

module.exports = () => {
  return {
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      jasmine: {
        random: true
      }
    },
    coverageIstanbulReporter: {
      dir: join(__dirname, 'coverage'),
      reports: ['text-summary', 'html', 'lcovonly'],
      fixWebpackSourcePaths: true,
      thresholds: {
        emitWarning: false, // <- this is important to make karma fail
        global: {
          statements: 0,
          lines: 0,
          branches: 0,
          functions: 0
        }
      }
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml', 'coverage-istanbul'],
    port: 9876,
    browserNoActivityTimeout: 1000000,
    colors: true,
    logLevel: constants.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  };
};
