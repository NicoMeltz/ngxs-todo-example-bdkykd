import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tryCatch } from 'rxjs/internal-compatibility';
import { Todo } from './todo';
import { Todos } from './todo.actions';

interface TodoStateModel {
  todos: Todo[];
  filter: string;
}

const sampleTodos: Todo[] = [
  { description: 'Implement deleting a todo', done: true },
  { description: 'Implement completing a todo', done: true },
  { description: 'Implement deleting all todos', done: false },
  { description: 'Implement completing all todos', done: false },
  { description: 'Implement filtering the todo list', done: false },
];

@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    filter: null,
    todos: sampleTodos,
  },
})
export class TodoState {
  @Selector()
  static todos(state: TodoStateModel): Todo[] {
    // console.log('Selectortodos', state.todos);
    return state.todos;
  }

  @Selector()
  static filter(state: TodoStateModel): string {
    //console.log('Selector filter', state.filter);
    return state.filter;
  }

  @Selector([TodoState.todos, TodoState.filter])
  static filtertToDos(data) {
    return data.todos.filter((t: Todo) => {
      return !data.filter ? true : t.description.includes(data.filter);
    });
  }

  @Selector()
  static numUncheckedTodos(state: TodoStateModel): number {
    return state.todos.filter((todo) => !todo.done).length;
  }

  @Action(Todos.Create)
  createTodo(ctx: StateContext<TodoStateModel>, action: Todos.Create) {
    const todo = { description: action.payload, done: false };
    ctx.patchState({
      todos: [todo, ...ctx.getState().todos],
    });
  }

  @Action(Todos.Delete)
  deleteTodo(ctx: StateContext<TodoStateModel>, action: Todos.Delete) {
    const { todos } = ctx.getState();
    ctx.patchState({
      todos: todos.filter((todo) => todo !== action.payload),
    });
  }

  @Action(Todos.Toggle)
  toggleTodo(ctx: StateContext<TodoStateModel>, action: Todos.Toggle) {
    const todo = action.payload;
    todo.done = !todo.done;
    ctx.patchState({
      todos: [...ctx.getState().todos],
    });
  }

  @Action(Todos.ToggleAll)
  toggleAllTodos(ctx: StateContext<TodoStateModel>, action: Todos.ToggleAll) {
    const { todos } = ctx.getState();
    const allDone = todos.every((todo) => todo.done);
    todos.forEach((todo) => (todo.done = !allDone));
    ctx.patchState({
      todos: [...todos],
    });
  }
  @Action(Todos.SetFilter)
  setFilterTodos(ctx: StateContext<TodoStateModel>, action: Todos.SetFilter) {
    const filter = action.payload;
    console.log('setFilterTodos', filter);
    ctx.patchState({
      filter,
    });
  }
}
