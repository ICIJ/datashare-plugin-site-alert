module.exports = {
  src_folders: ['./tests'],
  webdriver: {
    start_process: true,
    port: 4444,
    server_path: require('geckodriver').path
  },
  test_settings: {
    default: {
      launch_url: 'about:blank',
      desiredCapabilities : {
        browserName : 'firefox',
        alwaysMatch: {
          'moz:firefoxOptions': {
            args: ['-headless'],
          }
        }
      }
    }
  }
};


// yarn build
// cat "$(npm pack)" | tar zxvf - -C ./tmp
// datashare --tcpListenPort 8008 --pluginsDir=$(pwd)/tmp
