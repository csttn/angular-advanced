import { Entry } from './../shared/entry.model';
import { Component, OnInit } from '@angular/core';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
})
export class EntryListComponent implements OnInit {
  constructor(private entryService: EntryService) {}

  entries: Entry[] = [];

  ngOnInit(): void {
    this.entryService.getAll().subscribe({
      next: (entriesJson) => {
        this.entries = Entry.jsonDataToEntries(entriesJson);
      },
      error: (err) => alert('Erro ao carregar a lista de lançamentos' + err),
    });
  }

  delete(entry: Entry): void {
    const mustDelete = confirm(
      `Deseja realmente excluir a categoria ${entry.name}?`
    );
    if (entry.id && mustDelete) {
      this.entryService.delete(entry.id).subscribe({
        next: () => {
          const index = this.entries.indexOf(entry);
          this.entries.splice(index, 1);
        },
        error(err) {
          alert('Erro ao deletar a categoria' + err);
        },
      });
    }
  }
}
