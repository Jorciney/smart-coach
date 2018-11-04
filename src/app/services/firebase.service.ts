import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
    allTodos: Observable<Array<any>>;

    private PATH_ROOT = '/';

  constructor(private databaseFB: AngularFireDatabase) { }

    public getAllTodosFromDB(): Observable<Array<any>> {
        return this.allTodos = this.databaseFB.list(this.PATH_ROOT).valueChanges();
    }
}
