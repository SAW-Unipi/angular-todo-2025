import { Component, computed, effect, inject, input } from "@angular/core";
import { List, ListService } from "../../services/list.service";
import { OpenIconComponent } from "../open-icon/open-icon.component";
import { Router } from "@angular/router";
import { EditIconComponent } from "../edit-icon/edit-icon.component";
import { CloseIconComponent } from "../close-icon/close-icon.component";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: "app-list",
  imports: [
    OpenIconComponent,
    EditIconComponent,
    CloseIconComponent,
    ReactiveFormsModule,
  ],
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.css",
})
export class ListComponent {
  router = inject(Router);
  listService = inject(ListService);

  list = input.required<List>();
  percentage = computed(() => {
    const completed = this.list().todos.filter((t) =>
      t.completed === "done"
    ).length;
    return (100 * completed / this.list().todos.length).toFixed(0) || 0;
  });

  editMode = false;
  nameControl = new FormControl("", Validators.required);

  constructor() {
    effect(() => {
      this.nameControl.setValue(this.list().name);
    });
  }

  goToTodosPage(id: string) {
    this.router.navigateByUrl(`/lists/${id}`);
  }

  onKeyUp(e: KeyboardEvent) {
    const name = this.nameControl.value!;

    if (name.trim() === "") {
      return;
    }

    if (e.key === "Enter") {
      this.listService.updateList({ ...this.list(), name });
      this.editMode = false;
      return;
    }

    if (e.key === "Escape") {
      this.nameControl.setValue(this.list().name);
      this.editMode = false;
      return;
    }
  }
}
