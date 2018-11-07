import {Component} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage {
    isUserSignedIn: boolean;

    constructor(private authService: AuthenticationService) {
        this.authService.getUser().subscribe(user => {
            if (user) {
                this.isUserSignedIn = true;
            }
        });
    }

    login(): void {
        this.authService.signingWithGoogle();
    }

    logout(): void {
        this.authService.logout().then(res => this.isUserSignedIn = false);
    }
}
