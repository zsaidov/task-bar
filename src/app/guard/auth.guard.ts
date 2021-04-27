import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {TokenService} from '../services/token.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private token: TokenService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.token.getToken()) {
            return true;
        }
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}}).catch();
        return false;
    }
}
