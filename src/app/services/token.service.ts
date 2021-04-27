import {Injectable} from '@angular/core';
import {getFromLocalStorage, setToLocalStorage} from '../utils/storage-util';

@Injectable()
export class TokenService {

    private key = 'user_token';

    /**
     * Sets a token into the storage.
     * This method is used by the AuthService automatically.
     */
    setToken(data: string): void {
        if (!data) {
            return;
        }
        setToLocalStorage(this.key, data);
    }

    /**
     * Returns observable of current token
     */
    getToken(): string {
        return getFromLocalStorage(this.key);
    }

    /**
     * Clears token from localStorage
     */
    clear(): void {
        localStorage.removeItem(this.key);
    }


}
