import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {Todo} from '../model/todo';
import {List} from '@ionic/angular';

@Component({
    selector: 'app-todos-view',
    templateUrl: './todos-view.page.html',
    styleUrls: ['./todos-view.page.scss']
})
export class TodosViewPage implements OnInit {
    allTodos: Array<Todo>;
    @Input() todo: Todo = new Todo();
    @ViewChild('slidingList') slidingList: List;

    constructor(public firebaseService: FirebaseService,
                private changeDetector: ChangeDetectorRef) {
    }


    ngOnInit() {
        this.firebaseService.getAllTodosFromDB().subscribe(todos => {
            this.allTodos = todos;
            this.changeDetector.detectChanges();
        });
    }

    async deleteTodo(todo: Todo) {
        this.firebaseService.deleteTodo(todo.title).subscribe(isDeleted => {
            if (isDeleted) {
                console.log('Todo deleted');
            }
        });
        await this.slidingList.closeSlidingItems();
    }
}
