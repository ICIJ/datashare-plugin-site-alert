const { main } = require('../../package.json')

module.exports = {
  'default configuration test' : function (browser) {
    browser.url('http://localhost:8008')
    // Wait for the app to be started
    browser.waitForElementVisible('.landing')
    browser.assert.titleContains('Datashare')
    browser.expect.element(`script[src="/plugins/package/${main}"]`).to.be.present
    browser.expect.element('.landing .site-alert').to.be.present
    browser.expect.element('.landing .site-alert').text.to.startWith('Hello local, welcome to Datashare!')
    // Move to the search page
    browser.click('.search-bar__submit')
    browser.waitForElementVisible('.search')
    browser.expect.element('.search > span .site-alert').to.be.present
    browser.expect.element('.search > span .site-alert').text.to.startWith('Hello local, welcome to Datashare!')
    browser.expect.element('.search > span .site-alert').to.have.property('classList').contain('bg-warning')
  }
};
