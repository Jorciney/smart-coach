import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireAction, AngularFireDatabase, AngularFireList, DatabaseSnapshot} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {flatMap, map, mergeMap} from 'rxjs/operators';
import {Todo} from '../model/todo';
import {TodoUtils} from '../utils/todo.utils';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    private firebaseList: AngularFireList<any>;
    private PATH_ROOT = '/';
    todosKeyValues: Map<string, Todo> = new Map();

    constructor(private databaseFB: AngularFireDatabase, private authFirebaseService: AngularFireAuth) {
        this.firebaseList = this.databaseFB.list(this.PATH_ROOT);
    }

    private getUserPath() {
        return this.authFirebaseService.authState.pipe(map(user => {
            if (user) {
                this.PATH_ROOT = `todos/${user.uid}/`;
            } else {
                this.PATH_ROOT = 'todos/anonymous/';
            }
            this.firebaseList = this.databaseFB.list(this.PATH_ROOT);
            return this.PATH_ROOT;
        }));
    }

    public getAllTodosFromDB(): Observable<Array<any>> {
        return this.getUserPath().pipe(
            mergeMap(() => this.fetchKeyValues()),
            flatMap(() => {
                return this.databaseFB.list(this.PATH_ROOT).valueChanges();
            }));
    }

    getTodo(title: string): Observable<any> {
        const foundEntry = this.databaseFB.list(this.PATH_ROOT, ref => ref.orderByChild('title').equalTo(title));
        return foundEntry ? foundEntry.valueChanges() : undefined;
    }

    public addTodo(todo: Todo): void {
        this.firebaseList.push(todo);
    }

    updateTodo(key: string, todo: Todo): void {
        this.databaseFB.object(this.PATH_ROOT + key).update(todo)
            .catch(TodoUtils.handleError('updateTodo', todo.title));
    }

    updateTodoThatHasTitle(title: string, todo: Todo): void {
        this.todosKeyValues.forEach((value, key) => {
            if (value.title === title) {
                const updated = Object.assign(value, todo);
                this.firebaseList.update(key, updated);
            }
        });

    }


    deleteTodo(title: string): Observable<boolean> {
        return this.getTodoSnapshotForTitle(title).pipe(map(todoToBeDeleted => {
            if (todoToBeDeleted) {
                this.firebaseList.remove(todoToBeDeleted.payload.key);
                return true;
            } else {
                return false;
            }
        }));
    }

    private getTodoSnapshotForTitle(title: string): Observable<AngularFireAction<DatabaseSnapshot<any>>> {
        return this.firebaseList.snapshotChanges()
            .pipe(map(value => value.filter(todo => todo.payload.val().title === title).pop()));
    }

    private fetchKeyValues(): Observable<any> {
        return this.databaseFB.list(this.PATH_ROOT).snapshotChanges()
            .pipe(map(actions => {
                actions.forEach(action => {
                    const value = action.payload.val();
                    const id = action.payload.key;
                    this.todosKeyValues.set(id, value);
                });
            }));
    }
}
