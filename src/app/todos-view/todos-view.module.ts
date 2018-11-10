import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {TodosViewPage} from './todos-view.page';

const routes: Routes = [
    {
        path: '',
        component: TodosViewPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [TodosViewPage]
})
export class TodosViewPageModule {
}
