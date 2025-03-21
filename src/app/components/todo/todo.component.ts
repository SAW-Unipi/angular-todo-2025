import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from "@angular/core";
import { ListService, Todo } from "../../services/list.service";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-todo",
  imports: [ReactiveFormsModule],
  templateUrl: "./todo.component.html",
  styleUrl: "./todo.component.css",
})
export class TodoComponent {
  listService = inject(ListService);

  listId = input.required<string>();
  todo = input.required<Todo>();

  checked = computed(() => this.todo().completed === "done");
  editMode = false;

  textControl = new FormControl();

  constructor() {
    effect(() => {
      this.textControl.setValue(this.todo().text);
    });
  }

  onKeyUp(e: KeyboardEvent) {
    const text = this.textControl.value;

    if (text.trim() === "") {
      return;
    }

    if (e.key === "Enter") {
      this.listService.addTodo(this.listId(), text);
      this.editMode = false;
      return;
    }

    if (e.key === "Escape") {
      this.textControl.setValue(this.todo().text);
      this.editMode = false;
      return;
    }
  }

  toggleState() {
    this.listService.updateTodo(this.listId(), {
      ...this.todo(),
      completed: this.todo().completed === "done" ? "ongoing" : "done",
    });
  }
}
