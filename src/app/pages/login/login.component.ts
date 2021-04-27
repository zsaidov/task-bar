import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TokenService} from '../../services/token.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    form: FormGroup;

    private returnUrl: string;

    /**
     * Constructor
     */
    constructor(private route: ActivatedRoute,
                private router: Router,
                private tokenService: TokenService,
                private authenticationService: AuthenticationService,
                private fb: FormBuilder,
                private matSnackBar: MatSnackBar) {
        if (this.authenticationService.isLoggedIn) {
            this.router.navigateByUrl('/task').catch();
        }
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this.fb.group({
            username: ['admin', [Validators.required]],
            password: ['123', Validators.required]
        });
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    }

    ngOnDestroy(): void {
        this.loginForm = null;
        this.form = null;
    }

    /**
     * log in
     */
    onLoginClick(): void {
        this.authenticationService
            .login(this.loginForm.value.username, this.loginForm.value.password)
            .subscribe(
                () => {
                    const url = this.returnUrl || '/task';
                    this.router.navigate([url]).catch(() => '');
                },
                (error) => {
                    this.matSnackBar.open(
                        'Email or password incorrect!!!',
                        'Error!',
                        {
                            panelClass: ['red-600-fg', 'primary-50-bg'],
                            verticalPosition: 'top',
                            duration: 2000,
                        }
                    );
                    console.log(error);
                }
            );
    }
}
