const env = {
  development: {
    urls: {
      podHost: 'http://localhost:7777'
    }
  },
  production: {
    urls: {
      podHost: 'https://pod.hyperpure.com/'
    }
  },
  staging: {
    urls: {
      podHost: 'https://staging.hyperpure.com/'
    }
  },
  devServer: {
    urls: {
      podHost: 'https://devpod.hyperpure.com/'
    }
  }
};

let apiEndpoint = ''
if (process.env.REACT_APP_API_ENDPOINT) {
  apiEndpoint = env[process.env.REACT_APP_API_ENDPOINT];
} else {
  apiEndpoint = env[process.env.NODE_ENV];
}

export default apiEndpoint;
