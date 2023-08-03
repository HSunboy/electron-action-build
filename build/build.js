const { execSync } = require('child_process');
const electronBuilder = require('electron-builder');
/**
 * build renderer
 */
async function buildWeb() {
  const result = execSync('npm run build', {
    stdio: 'inherit',
  });
  if (result && result.error) {
    console.error(result.error.message);
    return false;
  }
  return true;
}

async function buildClient(target) {
  const buildMap = {
    mac: [
      {
        ENV: '',
        ARCH: '',
        targets: electronBuilder.Platform.MAC.createTarget(),
      },
    ],
    'mac-jre': [
      {
        ENV: 'jre',
        ARCH: '',
        targets: electronBuilder.Platform.MAC.createTarget(),
      },
    ],
    'linux_x86': [
      {
        ENV: 'jre',
        ARCH: '',
        targets: electronBuilder.Platform.LINUX.createTarget(['deb', 'AppImage'], electronBuilder.Arch.x64),
      },
    ],
    'linux_aarch64': [
      {
        ENV: 'jre',
        ARCH: '',
        targets: electronBuilder.Platform.LINUX.createTarget(['deb', 'AppImage'], electronBuilder.Arch.arm64),
      },
    ],
    win: [
      {
        ENV: '',
        ARCH: 'win64',
        targets: electronBuilder.Platform.WINDOWS.createTarget('nsis', electronBuilder.Arch.x64),
      },
      {
        ENV: '',
        ARCH: 'win32',
        targets: electronBuilder.Platform.WINDOWS.createTarget('nsis', electronBuilder.Arch.ia32),
      },
    ],
    'win-jre': [
      {
        ENV: 'jre',
        ARCH: 'win64',
        targets: electronBuilder.Platform.WINDOWS.createTarget('nsis', electronBuilder.Arch.x64),
      },
    ]
  };
  const command = buildMap[target];
  if (!command) {
    return false;
  }
  for (const c of command) {
    process.env.ENV = c.ENV;
    process.env.ARCH = c.ARCH;
    try {
      await electronBuilder.build({
        targets: c.targets,
        publish: 'never'
      });
    } catch (e) {
      console.error('构建失败！', e)
      process.exit(1)
    }
  }
  return true;
}

async function run() {
  console.log('sign: ', process.env.CSC_LINK)
  switch (process.argv[2]) {
    case 'linux': {

      await buildWeb()
      await buildClient('linux_x86');
      await buildClient('linux_aarch64');
      return;
    }
    case 'mac-win': {

      await buildWeb();
      await buildClient('mac-jre');
      await buildClient('win-jre');
      return;
    }
    case 'all': {

      await buildWeb();
      await buildClient('mac-jre');
      await buildClient('win-jre');
      await buildClient('linux_x86');
      await buildClient('linux_aarch64');
      return;
    }
  }
  console.log('[Done]Electron Builder')
}
run();
