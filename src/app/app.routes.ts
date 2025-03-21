import { Routes } from "@angular/router";
import { ListPageComponent } from "./components/list-page/list-page.component";
import { TodoPageComponent } from "./components/todo-page/todo-page.component";

export const routes: Routes = [
    { path: "lists/:id", component: TodoPageComponent },
    { path: "**", component: ListPageComponent },
];
