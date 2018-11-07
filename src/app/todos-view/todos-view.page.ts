import {Component, Input, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {Todo} from '../model/todo';

@Component({
    selector: 'app-todos-view',
    templateUrl: './todos-view.page.html',
    styleUrls: ['./todos-view.page.scss']
})
export class TodosViewPage implements OnInit {
    allTodos: Array<Todo>;
    @Input() todo: Todo = new Todo();

    constructor(public firebaseService: FirebaseService) {
    }

    ngOnInit() {
        this.firebaseService.getAllTodosFromDB().subscribe(todos => {
            this.allTodos = todos;
        });
    }

    deleteTodo(todo: Todo): void{
        this.firebaseService.deleteTodo(todo.title);
    }
}
