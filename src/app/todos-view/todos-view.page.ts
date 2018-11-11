import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {Todo} from '../model/todo';
import {ItemSliding} from '@ionic/angular';

@Component({
    selector: 'app-todos-view',
    templateUrl: './todos-view.page.html',
    styleUrls: ['./todos-view.page.scss']
})
export class TodosViewPage implements OnInit {
    allTodos: Array<Todo>;
    @Input() todo: Todo = new Todo();

    constructor(public firebaseService: FirebaseService,
                private changeDetector: ChangeDetectorRef) {
    }


    ngOnInit() {
        this.firebaseService.getAllTodosFromDB().subscribe(todos => {
            this.allTodos = todos;
            this.changeDetector.detectChanges();
        });
    }

    deleteTodo(slidingItem: ItemSliding, todo: Todo) {
        slidingItem.close();
        this.firebaseService.deleteTodo(todo.title).subscribe(isDeleted => {
            if (isDeleted) {
                console.log('Todo deleted');
            }
        });
    }
}
