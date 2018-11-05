import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {flatMap, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    private firebaseList: AngularFireList<any>;

    private PATH_ROOT = '/';

    constructor(private databaseFB: AngularFireDatabase, private authFirebaseService: AngularFireAuth) {
    }

    private getUserPath() {
        return this.authFirebaseService.authState.pipe(map(user => {
            if (user) {
                this.PATH_ROOT = `todos/${user.uid}/`;
            } else {
                this.PATH_ROOT = 'todos/anonymous/';
            }
            return this.PATH_ROOT;
        }));
    }

    public getAllTodosFromDB(): Observable<Array<any>> {
        return this.getUserPath().pipe(flatMap(() => this.databaseFB.list(this.PATH_ROOT).valueChanges()));
    }
}
