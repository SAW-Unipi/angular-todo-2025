import { Component, computed, effect, inject, input } from "@angular/core";
import { BackIconComponent } from "../back-icon/back-icon.component";
import { Router } from "@angular/router";
import { ListService } from "../../services/list.service";
import { TodoComponent } from "../todo/todo.component";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-todo-page",
  imports: [BackIconComponent, TodoComponent, ReactiveFormsModule],
  templateUrl: "./todo-page.component.html",
  styleUrl: "./todo-page.component.css",
})
export class TodoPageComponent {
  router = inject(Router);
  listService = inject(ListService);

  id = input.required<string>();

  todos = computed(() =>
    this.listService.lists().find((l) => l.id === this.id())?.todos || []
  );

  textControl = new FormControl();

  onKeyUp(e: KeyboardEvent) {
    const name = this.textControl.value;

    if (name.trim() === "") {
      return;
    }

    if (e.key === "Enter") {
      this.listService.addTodo(this.id(), name);
      this.textControl.setValue("");
      return;
    }

    if (e.key === "Escape") {
      this.textControl.setValue("");
      return;
    }
  }
}
