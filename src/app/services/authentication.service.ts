import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {User} from 'firebase';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {Platform} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    public firebaseUser: Observable<firebase.User>;
    private userDetails: firebase.User = null;

    constructor(private firebaseAuth: AngularFireAuth,
                private googlePlus: GooglePlus,
                private platform: Platform,
                private router: Router) {
        this.firebaseUser = this.firebaseAuth.authState;
    }

    signingWithGoogle(): Promise<any> {
        let userPromise: Promise<any>;
        if (this.platform.is('cordova')) {
            userPromise = this.nativeGoogleLogin();
        } else {
            userPromise = this.webGoogleLogin();
            // this.firebaseAuth.auth.signInWithRedirect(provider)
            //     .then(function () {
            //         return firebase.auth().getRedirectResult();
            //     })
            //     .then(fireBaseUser => this.userDetails = fireBaseUser.user)
            //     .catch(function (error) {
            //         console.error('User could not sign in', error);
            //     });
        }
        return userPromise.then(fireBaseUser => this.userDetails = fireBaseUser.user)
            .catch(function (error) {
                console.error('User could not sign in', error);
            });
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

    async nativeGoogleLogin(): Promise<any> {
        try {
            const gplusUser = await this.googlePlus.login({
                'webClientId': '258941864321-jctqtfsv4dja18tuvhjdqd7m53mp6s6b.apps.googleusercontent.com',
                'offline': true,
                'scopes': 'profile email'
            });
            const provider = firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken);

            return await this.firebaseAuth.auth.signInWithCredential(provider);
        } catch (err) {
            console.error('Error trying to use native Login. ', err);
        }
    }

    async webGoogleLogin(): Promise<void> {
        const provider = new firebase.auth.GoogleAuthProvider();
        this.firebaseAuth.auth.signInWithRedirect(provider)
            .then(function () {
                return firebase.auth().getRedirectResult();
            })
            .then(fireBaseUser => this.userDetails = fireBaseUser.user)
            .catch(function (error) {
                console.error('User could not sign in', error);
            });

    }
}
