const distDir = 'dist';


const config = {
  productName: 'shankar',
  compression: 'normal',
  afterSign: "electron-builder-notarize",
  mac: {
    hardenedRuntime: true,
    category: 'public.app-category.developer-tools',
    entitlements: "./node_modules/electron-builder-notarize/entitlements.mac.inherit.plist",
    entitlementsInherit: "./node_modules/electron-builder-notarize/entitlements.mac.inherit.plist",
    gatekeeperAssess: false,
    target: 'dmg',
  },
  dmg: {
    artifactName: 'shankar_${version}${env.ENV}.${ext}',
    writeUpdateInfo: false
  },
  win: {
    target: 'nsis',
    rfc3161TimeStampServer: "http://sha256timestamp.ws.symantec.com/sha256/timestamp",
    signingHashAlgorithms: ["sha256"]
  },
  nsis: {
    differentialPackage: false,
    artifactName: 'shankar_Setup_${version}_${env.ARCH}${env.ENV}.${ext}',
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    runAfterFinish: false,
    perMachine: true,
    menuCategory: 'ShankarBuilder',
    warningsAsErrors: false,
  },
  linux: {
    target: [
      {
       target: "deb"
      },
      {
       target: "rpm"
      },
      {
       target: "AppImage"
      }
    ],
    category: 'Development',
    maintainer: 'Shankar'
  },
  directories: {
    output: 'release',
  },
  appId: 'com.xiaokang.actiontest',
  asar: true,
  extraMetadata: {
    main: 'main.js',
  },
  files: [
    {
      from: '.',
      filter: ['package.json'],
    }
  ]
};

module.exports = config;
