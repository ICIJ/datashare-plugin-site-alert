const { main } = require('../../package.json')

module.exports = {
  'add the package script' : function (browser) {
    browser.url('http://localhost:8008')
    // Wait for the app to be started
    browser.waitForElementVisible('.landing')
    browser.assert.titleContains('Datashare')
    browser.expect.element(`script[src="/plugins/package/${main}"]`).to.be.present
  },
  // This test is currently disabled
  'add a site alert': function(browser) {
    browser.url('http://localhost:8008')
    // Wait for the app to be started
    browser.waitForElementVisible('.app')
    browser.expect.element('.site-alert').to.be.present
    browser.expect.element('.site-alert').text.to.startWith('Hello local, welcome to Datashare!')
  }
}
