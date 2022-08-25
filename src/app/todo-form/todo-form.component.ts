import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Todos } from '../todo.actions';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent {
  todoForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.todoForm = fb.group({
      descriptionCtrl: '',
    });
  }

  submitTodo() {
    const { descriptionCtrl } = this.todoForm.value;
    this.store.dispatch(new Todos.Create(descriptionCtrl));
    console.log('add Create', descriptionCtrl);
  }
}
