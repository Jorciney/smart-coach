import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';

@Component({
    selector: 'app-todos-view',
    templateUrl: './todos-view.page.html',
    styleUrls: ['./todos-view.page.scss']
})
export class TodosViewPage implements OnInit {
    allTodos: Array<any>;

    constructor(public firebaseService: FirebaseService) {
    }

    ngOnInit() {
        this.firebaseService.getAllTodosFromDB().subscribe(todos => {
            console.log(todos);
            this.allTodos = todos;
        });
    }

}
