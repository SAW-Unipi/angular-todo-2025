import { Component, inject } from "@angular/core";
import { ListComponent } from "../list/list.component";
import { ListService } from "../../services/list.service";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-list-page",
  imports: [ReactiveFormsModule, ListComponent],
  templateUrl: "./list-page.component.html",
  styleUrl: "./list-page.component.css",
})
export class ListPageComponent {
  listService = inject(ListService);

  nameControl = new FormControl();

  onKeyUp(e: KeyboardEvent) {
    const name = this.nameControl.value;

    if (name.trim() === "") {
      return;
    }

    if (e.key === "Enter") {
      this.listService.addList(name);
      this.nameControl.setValue("");
      return;
    }

    if (e.key === "Escape") {
      this.nameControl.setValue("");
      return;
    }
  }
}
