if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,o)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let r={};const l=e=>i(e,t),c={module:{uri:t},exports:r,require:l};s[t]=Promise.all(n.map((e=>c[e]||l(e)))).then((e=>(o(...e),r)))}}define(["./workbox-aff5ef07"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-7eLsbyip.css",revision:null},{url:"assets/index-tF6lTL-M.js",revision:null},{url:"index.html",revision:"a0773fee4e96bdb67a79a4aa555d8378"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.ico",revision:"09d643d41988a220c7f7cfa771c7fded"},{url:"logo.png",revision:"7250abddc0400d916ef9a0b6d5470c27"},{url:"manifest.webmanifest",revision:"11e2a2561f2e03f63aac098c20ebd183"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/^https:\/\/sheets\.googleapis\.com*/,new e.NetworkFirst({cacheName:"google-sheet",plugins:[new e.ExpirationPlugin({maxAgeSeconds:2592e3}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));