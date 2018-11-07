import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {User} from 'firebase';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    public firebaseUser: Observable<firebase.User>;
    private userDetails: firebase.User = null;

    constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
        this.firebaseUser = this.firebaseAuth.authState;
    }

    signingWithGoogle(): Promise<any> {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.firebaseAuth.auth.signInWithPopup(provider)
            .then(fireBaseUser => this.userDetails = fireBaseUser.user);
    }

    signingWithFb(): Promise<any> {
        // TODO test and fix signing with FB
        return this.firebaseAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }

    logout() {
        return this.firebaseAuth.auth.signOut()
            .then(res => this.router.navigate(['/']))
            .then(res => console.log('User signed out.'));
    }

    getUser(): Observable<User> {
        return this.firebaseAuth.authState;
    }
}
