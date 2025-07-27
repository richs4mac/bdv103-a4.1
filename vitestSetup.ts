// this didn't work, so I'm not testing with in-memory mongodb
// CI tests are for logic only

//  RUN  v3.2.4 /workspaces/bdv103-a4.1

// stderr | books/vitestTesting.ts
// Starting the MongoMemoryServer Instance failed, enable debug log for more information. Error:
//  DownloadError: Download failed for url "https://fastdl.mongodb.org/linux/mongodb-linux-aarch64-debian12-8.0.11.tgz", Details:
// Status Code is 403 (MongoDB's 404)
// This means that the requested version-platform combination doesn't exist
// Try to use different version 'new MongoMemoryServer({ binary: { version: 'X.Y.Z' } })'
// List of available versions can be found here: https://www.mongodb.com/download-center/community/releases/archive
//     at RedirectableRequest.<anonymous> (/workspaces/bdv103-a4.1/node_modules/mongodb-memory-server-core/src/util/MongoBinaryDownload.ts:383:17)
//     at RedirectableRequest.emit (node:events:524:28)
//     at RedirectableRequest._processResponse (/workspaces/bdv103-a4.1/node_modules/follow-redirects/index.js:409:10)
//     at ClientRequest.RedirectableRequest._onNativeResponse (/workspaces/bdv103-a4.1/node_modules/follow-redirects/index.js:102:12)
//     at Object.onceWrapper (node:events:639:26)
//     at ClientRequest.emit (node:events:524:28)
//     at HTTPParser.parserOnIncomingClient (node:_http_client:702:27)
//     at HTTPParser.parserOnHeadersComplete (node:_http_common:118:17)
//     at TLSSocket.socketOnData (node:_http_client:544:22)
//     at TLSSocket.emit (node:events:524:28) {
//   url: 'https://fastdl.mongodb.org/linux/mongodb-linux-aarch64-debian12-8.0.11.tgz',
//   msg: "Status Code is 403 (MongoDB's 404)\n" +
//     "This means that the requested version-platform combination doesn't exist\n" +
//     "Try to use different version 'new MongoMemoryServer({ binary: { version: 'X.Y.Z' } })'\n" +
//     'List of available versions can be found here: https://www.mongodb.com/download-center/community/releases/archive'
// }

// stderr | books/list.ts
// Starting the MongoMemoryServer Instance failed, enable debug log for more information. Error:
//  UnableToUnlockLockfileError: Cannot unlock file "/root/.cache/mongodb-binaries/8.0.11.lock", because it is not locked by this process
//     at LockFile.unlock (/workspaces/bdv103-a4.1/node_modules/mongodb-memory-server-core/src/util/lockfile.ts:275:15)
//     at Function.download (/workspaces/bdv103-a4.1/node_modules/mongodb-memory-server-core/src/util/MongoBinary.ts:52:7)
//     at Function.getPath (/workspaces/bdv103-a4.1/node_modules/mongodb-memory-server-core/src/util/MongoBinary.ts:132:22)
//     at MongoInstance.start (/workspaces/bdv103-a4.1/node_modules/mongodb-memory-server-core/src/util/MongoInstance.ts:366:22)
//     at Function.create (/workspaces/bdv103-a4.1/node_modules/mongodb-memory-server-core/src/util/MongoInstance.ts:294:5)
//     at MongoMemoryServer._startUpInstance (/workspaces/bdv103-a4.1/node_modules/mongodb-memory-server-core/src/MongoMemoryServer.ts:530:22)
//     at MongoMemoryServer.start (/workspaces/bdv103-a4.1/node_modules/mongodb-memory-server-core/src/MongoMemoryServer.ts:350:5)
//     at Function.create (/workspaces/bdv103-a4.1/node_modules/mongodb-memory-server-core/src/MongoMemoryServer.ts:317:5)
//     at /workspaces/bdv103-a4.1/vitestSetup.ts:5:18
//     at VitestExecutor.runModule (file:///workspaces/bdv103-a4.1/node_modules/vite-node/dist/client.mjs:397:4) {
//   thisInstance: false,
//   file: '/root/.cache/mongodb-binaries/8.0.11.lock'
// }


// ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Suites 2 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

//  FAIL  books/vitestTesting.ts [ books/vitestTesting.ts ]
// Error: Download failed for url "https://fastdl.mongodb.org/linux/mongodb-linux-aarch64-debian12-8.0.11.tgz", Details:
// Status Code is 403 (MongoDB's 404)
// This means that the requested version-platform combination doesn't exist
// Try to use different version 'new MongoMemoryServer({ binary: { version: 'X.Y.Z' } })'
// List of available versions can be found here: https://www.mongodb.com/download-center/community/releases/archive
//  ❯ RedirectableRequest.<anonymous> node_modules/mongodb-memory-server-core/src/util/MongoBinaryDownload.ts:383:17
//  ❯ RedirectableRequest._processResponse node_modules/follow-redirects/index.js:409:10
//  ❯ ClientRequest.RedirectableRequest._onNativeResponse node_modules/follow-redirects/index.js:102:12

// ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/2]⎯

//  FAIL  books/list.ts [ books/list.ts ]
// Error: Cannot unlock file "/root/.cache/mongodb-binaries/8.0.11.lock", because it is not locked by this process
//  ❯ LockFile.unlock node_modules/mongodb-memory-server-core/src/util/lockfile.ts:275:15
//  ❯ Function.download node_modules/mongodb-memory-server-core/src/util/MongoBinary.ts:52:7
//  ❯ Function.getPath node_modules/mongodb-memory-server-core/src/util/MongoBinary.ts:132:22
//  ❯ MongoInstance.start node_modules/mongodb-memory-server-core/src/util/MongoInstance.ts:366:22
//  ❯ Function.create node_modules/mongodb-memory-server-core/src/util/MongoInstance.ts:294:5
//  ❯ MongoMemoryServer._startUpInstance node_modules/mongodb-memory-server-core/src/MongoMemoryServer.ts:530:22
//  ❯ MongoMemoryServer.start node_modules/mongodb-memory-server-core/src/MongoMemoryServer.ts:350:5
//  ❯ Function.create node_modules/mongodb-memory-server-core/src/MongoMemoryServer.ts:317:5
//  ❯ vitestSetup.ts:5:18
//       3| // setup a mongodb server for vitest tests
//       4| 
//       5| const instance = await MongoMemoryServer.create({ binary: { version: '8.0.11' } });
//        |                  ^
//       6| while (instance.state === 'new') {
//       7|   await instance.start();



//////////////////// CODE IS DOWN HERE

// import { MongoMemoryServer } from "mongodb-memory-server";

// setup a mongodb server for vitest tests

// const instance = await MongoMemoryServer.create({ binary: { version: '8.0.11' } });
// while (instance.state === 'new') {
//   await instance.start();
// }
// const uri = instance.getUri();
// (global as any).__MONGOINSTANCE = instance;
// (global as any).MONGO_URI = uri.slice(0, uri.lastIndexOf('/'));
