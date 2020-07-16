import Router from "next/router";
import NProgress from "nprogress";

let timer;
let state;
let activeRequests = 0;
const delay = 250;

const load = () => {
  if (state === "loading") {
    return;
  }

  state = "loading";

  timer = setTimeout(() => NProgress.start(), delay);
};

const stop = () => {
  if (activeRequests > 0) {
    return;
  }

  state = "stop";

  clearTimeout(timer);
  NProgress.done();
};

Router.events.on("routeChangeStart", load);
Router.events.on("routeChangeComplete", stop);
Router.events.on("routeChangeError", stop);

const originalFetch = window.fetch;
window.fetch = async (...args) => {
  if (activeRequests === 0) {
    load();
  }

  activeRequests++;

  try {
    const response = await originalFetch(...args);
    return response;
  } catch (err) {
    return Promise.reject(err);
  } finally {
    activeRequests -= 1;
    if (activeRequests === 0) {
      stop();
    }
  }
};

export default function () {
  return null;
}
