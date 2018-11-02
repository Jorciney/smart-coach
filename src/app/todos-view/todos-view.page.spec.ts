import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosViewPage } from './todos-view.page';

describe('TodosViewPage', () => {
  let component: TodosViewPage;
  let fixture: ComponentFixture<TodosViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
