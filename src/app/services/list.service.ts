import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ListService {
  lists = signal<List[]>([
    {
      id: "l-1",
      name: "Checklist Progetto",
      todos: [
        {
          id: "t-1",
          text: "Inviare mail proposta progetto",
          completed: "done",
        },
        { id: "t-2", text: "Attendere Ack", completed: "ongoing" },
        { id: "t-3", text: "Sviluppare progetto", completed: "ongoing" },
        {
          id: "t-4",
          text: "Iscriversi ad un appello",
          completed: "ongoing",
        },
        {
          id: "t-5",
          text: "Rispondere correttamente all'esame",
          completed: "ongoing",
        },
        { id: "t-6", text: "Festeggiare", completed: "ongoing" },
      ],
    },
    {
      id: "l-2",
      name: "Dev Roadmap",
      todos: [
        {
          id: "t-7",
          text: "Scegliere un linguaggio di progammazione",
          completed: "done",
        },
        { id: "t-8", text: "Imparare linguaggio", completed: "done" },
        {
          id: "t-9",
          text: "Sviluppare un progetto di esempio",
          completed: "ongoing",
        },
      ],
    },
  ]);

  addList(name: string) {
    const newList: List = {
      id: window.crypto.randomUUID(),
      name,
      todos: [],
    };

    this.lists.update((p) => [...p, newList]);
  }

  removeList(id: string) {
    this.lists.update((p) => p.filter((l) => l.id !== id));
  }

  updateList(l: List) {
    this.lists.update((p) => p.map((i) => i.id === l.id ? l : i));
  }

  addTodo(listId: string, text: string) {
    const newTodo: Todo = {
      id: window.crypto.randomUUID(),
      text,
      completed: "ongoing",
    };

    this.lists.update((p) =>
      p.map((l) => l.id === listId ? { ...l, todos: [...l.todos, newTodo] } : l)
    );
  }

  removeTodo(listId: string, id: string) {
    this.lists.update((p) =>
      p.map((l) =>
        l.id === listId
          ? { ...l, todos: l.todos.filter((t) => t.id !== id) }
          : l
      )
    );
  }

  updateTodo(listId: string, todo: Todo) {
    this.lists.update((p) =>
      p.map((l) =>
        l.id === listId
          ? { ...l, todos: l.todos.map((t) => t.id === todo.id ? todo : t) }
          : l
      )
    );
  }
}

export interface Todo {
  id: string;
  completed: "done" | "ongoing";
  text: string;
}

export interface List {
  id: string;
  name: string;
  todos: Todo[];
}
