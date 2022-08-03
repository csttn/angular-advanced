import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListComponent } from './enty-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entrry-form.component';

import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';

@NgModule({
  declarations: [EntryListComponent, EntryFormComponent],
  imports: [
    SharedModule,
    CommonModule,
    EntriesRoutingModule,
    CalendarModule,
    IMaskModule,
  ],
  exports: [EntryListComponent],
})
export class EntriesModule {}
