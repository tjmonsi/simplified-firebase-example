/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v3.6.3/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.6.3"});

workbox.core.setCacheNameDetails({prefix: "simplified-firebase-example"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "0a27a4163254fc8fce870c8cc3a3f94f"
  },
  {
    "url": "index.html",
    "revision": "1dbe8de1f5a6ae864647c6d506b6c536"
  },
  {
    "url": "index.js",
    "revision": "49ae9d925ca8e2eb916640c735935c12"
  },
  {
    "url": "lib/webcomponentsjs/apply-shim.html",
    "revision": "75f54922d2507d0c43bdf946149c38b1"
  },
  {
    "url": "lib/webcomponentsjs/apply-shim.min.js",
    "revision": "08ceedd3eb916ae19a9c463dedb5cc2c"
  },
  {
    "url": "lib/webcomponentsjs/bundles/webcomponents-ce.js",
    "revision": "16a6e231db0f767f82644d8cfa072ba0"
  },
  {
    "url": "lib/webcomponentsjs/bundles/webcomponents-sd-ce-pf.js",
    "revision": "ffe18001af5892184cf27f76ae905568"
  },
  {
    "url": "lib/webcomponentsjs/bundles/webcomponents-sd-ce.js",
    "revision": "9560eb5da6eaef26a19257c817092def"
  },
  {
    "url": "lib/webcomponentsjs/bundles/webcomponents-sd.js",
    "revision": "7655a91b07ce0fd3b2ea57ed256f9df9"
  },
  {
    "url": "lib/webcomponentsjs/custom-elements-es5-adapter.js",
    "revision": "ab073ba059d1e990f93247eacbc4fba4"
  },
  {
    "url": "lib/webcomponentsjs/custom-style-interface.html",
    "revision": "ceb0842ff6c53d8d13d6cf2345f41490"
  },
  {
    "url": "lib/webcomponentsjs/custom-style-interface.min.js",
    "revision": "e524768cbe7030b7c7b44c8a1581b354"
  },
  {
    "url": "lib/webcomponentsjs/entrypoints/apply-shim.js",
    "revision": "8ca6260698ee100e7b03abe68af9725a"
  },
  {
    "url": "lib/webcomponentsjs/entrypoints/custom-elements-es5-adapter-index.js",
    "revision": "5652c8f83533d62943792a7fe7a2e581"
  },
  {
    "url": "lib/webcomponentsjs/entrypoints/custom-style-interface.js",
    "revision": "52bf8cd070de17070c7d70f124539538"
  },
  {
    "url": "lib/webcomponentsjs/entrypoints/scoping-shim.js",
    "revision": "05f5a29485ac5a35619893244cbf51cf"
  },
  {
    "url": "lib/webcomponentsjs/entrypoints/webcomponents-bundle-index.js",
    "revision": "8dd62a28e52d133ef1ecf044bc51f109"
  },
  {
    "url": "lib/webcomponentsjs/entrypoints/webcomponents-ce-index.js",
    "revision": "0867f0cb4caf5081f1e85da13c24528a"
  },
  {
    "url": "lib/webcomponentsjs/entrypoints/webcomponents-sd-ce-index.js",
    "revision": "5d9cd4fb5d341a0e2890edaa2cc8e226"
  },
  {
    "url": "lib/webcomponentsjs/entrypoints/webcomponents-sd-ce-pf-index.js",
    "revision": "905226b876defd9d0c1444d353a4c4c5"
  },
  {
    "url": "lib/webcomponentsjs/entrypoints/webcomponents-sd-index.js",
    "revision": "d4e3a4413d567733a71057462763e36f"
  },
  {
    "url": "lib/webcomponentsjs/externs/shadycss-externs.js",
    "revision": "019c307b715d765c5c85c2e076bc7f6e"
  },
  {
    "url": "lib/webcomponentsjs/package.json",
    "revision": "1e09d1552ad5467b3974f84ac4214234"
  },
  {
    "url": "lib/webcomponentsjs/scoping-shim.min.js",
    "revision": "46a06d2e64c1a669cc28751b328d9785"
  },
  {
    "url": "lib/webcomponentsjs/src/apply-shim-utils.js",
    "revision": "b479ab4f7673f9f90dbc90ef13b6ae6c"
  },
  {
    "url": "lib/webcomponentsjs/src/apply-shim.js",
    "revision": "cf8ce93be096aa18db7f1e41c5e794ec"
  },
  {
    "url": "lib/webcomponentsjs/src/common-regex.js",
    "revision": "ecb2b61d3f4f6a95d701de5b47398d3f"
  },
  {
    "url": "lib/webcomponentsjs/src/common-utils.js",
    "revision": "6e2a375f9aa3201d88d333385738308c"
  },
  {
    "url": "lib/webcomponentsjs/src/css-parse.js",
    "revision": "deb723d168358b310384a5db1a101d5b"
  },
  {
    "url": "lib/webcomponentsjs/src/custom-style-interface.js",
    "revision": "622f150cf12c29b135b795e518694fcf"
  },
  {
    "url": "lib/webcomponentsjs/src/document-wait.js",
    "revision": "b7a5ce85e77980b964990fb6a914ae8d"
  },
  {
    "url": "lib/webcomponentsjs/src/document-watcher.js",
    "revision": "49748a60485cb452f6905fde753e7e64"
  },
  {
    "url": "lib/webcomponentsjs/src/scoping-shim.js",
    "revision": "70037234c7360ffcc0d63a6829e4cb20"
  },
  {
    "url": "lib/webcomponentsjs/src/style-cache.js",
    "revision": "1431cec535e214140906856fe343e7b8"
  },
  {
    "url": "lib/webcomponentsjs/src/style-info.js",
    "revision": "0462ba3ff8ca9dfacefb4a3474a749b2"
  },
  {
    "url": "lib/webcomponentsjs/src/style-placeholder.js",
    "revision": "6d9ce27625f3f190ac5e8082547a3e6f"
  },
  {
    "url": "lib/webcomponentsjs/src/style-properties.js",
    "revision": "3ad99438970055831f44726bc296db1b"
  },
  {
    "url": "lib/webcomponentsjs/src/style-settings.js",
    "revision": "44cd0e7c919e06e5fa1c1537c7ce1397"
  },
  {
    "url": "lib/webcomponentsjs/src/style-transformer.js",
    "revision": "87c0a1364c4be8ec3bceb5f43d0f7b12"
  },
  {
    "url": "lib/webcomponentsjs/src/style-util.js",
    "revision": "2ea61eef5d72c55064b617ca31db0f03"
  },
  {
    "url": "lib/webcomponentsjs/src/template-map.js",
    "revision": "619da773d3addbf785a0f897e59e589c"
  },
  {
    "url": "lib/webcomponentsjs/src/unscoped-style-handler.js",
    "revision": "713d539777181dc6e0fc9ae9ef117682"
  },
  {
    "url": "lib/webcomponentsjs/webcomponents-bundle.js",
    "revision": "ba9bab8c93719b2338f3be99d38a4857"
  },
  {
    "url": "lib/webcomponentsjs/webcomponents-loader.js",
    "revision": "d42dd0732b85d5efa9e1660a1747b05c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/index.html", {
  whitelist: [/^(?!(\/__)|(\/service-worker\.js)|(\/_bundle-sizes\.html)|(\/_statistic\.html)|(\/_statistic\.json))/],
  
});
