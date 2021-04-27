import {InjectionToken} from '@angular/core';

export let API_BASE_URL = new InjectionToken<string>('APIBaseUrl');

export function getBaseApiUrl(): string {
    return (window as any).hostUrl || window.location.href.split('#')[0] + 'api/';
}
