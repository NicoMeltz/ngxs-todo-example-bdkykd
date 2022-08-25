import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Todo } from '../todo';
import { TodoState } from '../todo.state';
import { Todos } from '../todo.actions';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  @Select(TodoState.numUncheckedTodos)
  uncheckedTodos: Observable<number>;

  todos: Observable<Todo[]>;
  filtertToDos: Observable<Todo[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.todos = this.store.select(TodoState.todos);
    this.filtertToDos = this.store.select(TodoState.filtertToDos);
  }

  toggleTodo(todo: Todo) {
    this.store.dispatch(new Todos.Toggle(todo));
  }

  deleteTodo(todo: Todo) {
    this.store.dispatch(new Todos.Delete(todo));
  }
}
