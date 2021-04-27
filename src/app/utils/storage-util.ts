const DAY = 1000 * 86400;

export function getFromLocalStorage(key: string): any {
    if (window.localStorage) {
        const str = localStorage.getItem(key);
        if (str && isJsonString(str)) {
            const obj: any = JSON.parse(str);
            if (new Date().getTime() - parseInt(obj.time, 10) > DAY) {
                localStorage.removeItem(key);
                return null;
            } else {
                return obj.data;
            }
        }
    }
    return null;
}

export function setToLocalStorage(key: string, data: any): void {
    if (window.localStorage) {
        const obj = {
            time: new Date().getTime(),
            data
        };
        localStorage.setItem(key, JSON.stringify(obj));
    }
}

function isJsonString(str): boolean {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
