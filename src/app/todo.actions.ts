import { Todo } from './todo';

export namespace Todos {
  export class Create {
    static readonly type = '[TODO] Create Todo';

    constructor(public payload: string) {}
  }

  export class Toggle {
    static readonly type = '[TODO] Toggle Todo';

    constructor(public payload: Todo) {}
  }

  export class Delete {
    static readonly type = '[TODO] Delete Todo';

    constructor(public payload: Todo) {}
  }

  export class ToggleAll {
    static readonly type = '[TODO] Toggle all Todos';
  }

  export class SetFilter {
    static readonly type = '[TODO] SetFilter for Todos';
    constructor(public payload: string) {}
  }
}
