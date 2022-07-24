import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: CategoryListComponent },
  { path: 'new', component: CategoryFormComponent },
  { path: ':id/edit', component: CategoryFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, FormsModule],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
