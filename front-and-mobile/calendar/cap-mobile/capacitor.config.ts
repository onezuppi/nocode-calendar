import { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize } from '@capacitor/keyboard';

const config: CapacitorConfig = {
    appId: 'io.ionic.starter',
    appName: 'calendar-mobile-app',
    webDir: '../../../../dist/apps/calendar-mobile-app',
    server: {
        allowNavigation: [
            'https://calendar-test.client.calendar-stable.k8s.corp.artsofte.ru/*'
        ],
        cleartext: true
    },
    bundledWebRuntime: true,
    ios: {
        scrollEnabled: false
    },
    plugins: {
        Keyboard: {
            resize: KeyboardResize.Body,
            resizeOnFullScreen: true
        }
    },
};

export default config;
