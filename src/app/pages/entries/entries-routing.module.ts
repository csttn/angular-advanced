import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryFormComponent } from './entry-form/entrry-form.component';
import { EntryListComponent } from './enty-list/entry-list.component';

const routes: Routes = [
  {
    path: '',
    component: EntryListComponent,
  },
  {
    path: 'new',
    component: EntryFormComponent,
  },
  {
    path: ':id/edit',
    component: EntryFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntriesRoutingModule {}
