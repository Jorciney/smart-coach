import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {AuthenticationService} from '../services/authentication.service';

@Component({
    selector: 'app-todos-view',
    templateUrl: './todos-view.page.html',
    styleUrls: ['./todos-view.page.scss']
})
export class TodosViewPage implements OnInit {
    allTodos: Array<any>;

    constructor(public firebaseService: FirebaseService, private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.firebaseService.getAllTodosFromDB().subscribe(todos => {
            this.allTodos = todos;
        });
    }


    signIn() {
        this.authenticationService.signingWithGoogle();
    }

    logout() {
        this.authenticationService.logout();
    }

}
