import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListComponent } from './enty-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entrry-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EntryListComponent, EntryFormComponent],
  imports: [CommonModule, EntriesRoutingModule, ReactiveFormsModule],
  exports: [EntryListComponent],
})
export class EntriesModule {}
