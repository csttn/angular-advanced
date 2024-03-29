import { CategoryService } from './../../categories/category.service';
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

import { success, error } from 'toastr';
import { Category } from '../../categories/shared/category.model';
import { localeCalendar } from '../shared/localeCalendar';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
})
export class EntryFormComponent implements OnInit, AfterContentChecked {
  constructor(
    private entryService: EntryService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  currentAction: string = '';
  entries: Entry[] = [];
  entryForm: FormGroup = this.formBuilder.group({
    id: [null],
    name: [null, [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.maxLength(300)]],
    type: ['Despesa', [Validators.required]],
    amount: [0, [Validators.required]],
    paid: [true],
    categoryId: [null],
    date: [null],
  });
  submitingForm: boolean = false;
  entry: Entry = new Entry();
  pageTitle: string = '';
  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '.',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ',',
    rightAlign: true,
    min: 0,
  };
  localePtBr = localeCalendar;
  types = ['Despesa', 'Receita'];
  categories: Category[] = [];
  serverErrorMessages: string[] = [];

  ngAfterContentChecked(): void {
    this.loadPageTitle();
  }

  private loadPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Cadastro de novo lançamento';
    } else {
      this.pageTitle = 'Editando lançamento: ' + this.entry.name;
    }
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.loadEntry();
    this.loadCategories();
  }

  private loadCategories() {
    this.categoryService.getAll().subscribe((categories) => {
      this.categories = categories;
    });
  }

  private loadEntry() {
    if (this.currentAction === 'edit') {
      this.entryService.getById(Number(this.entry.id)).subscribe((entry) => {
        this.entryForm.patchValue(entry);
        console.log(this.entryForm.value);
      });
    }
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }

    const entryId = this.route.snapshot.params['id'];
    if (entryId) {
      this.entry.id = entryId;
    }
  }

  submitForm() {
    this.submitingForm = true;
    if (this.currentAction === 'new') {
      this.createEntry();
    } else {
      this.updateEntry();
    }
  }

  updateEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

    this.categoryService
      .getById(Number(this.entryForm.value.categoryId + 1))
      .subscribe((category) => {
        entry.category = Object.assign(new Category(), category);
      });
    entry.id = this.entry.id;

    this.entryService.update(entry).subscribe({
      next: (entry) => {
        success('Sucesso', 'Registro atualizado com sucesso');
        this.router.navigateByUrl('/entries');
      },
      error: (err) => {
        error('Erro', 'Erro ao atualizar registro ' + err);
        this.serverErrorMessages.push(err.message);
      },
    });
  }

  createEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

    const amountConvert = parseFloat(
      this.amount?.value.toString().replace(',', '.')
    ).toPrecision(2);
    entry.amount = parseFloat(amountConvert);

    this.categoryService
      .getById(Number(this.entryForm.value.categoryId + 1))
      .subscribe((category) => {
        entry.category = Object.assign(new Category(), category);
      });

    entry.id = this.entry.id = Math.floor(Math.random() * 100);
    entry.date = String(new Date());

    this.entryService.create(entry).subscribe({
      next: (entry) => {
        success('Sucesso', 'Registro criado com sucesso');
        this.router.navigateByUrl('/entries');
      },
      error: (err) => {
        error('Erro', 'Erro ao criar registro ' + err);
        this.serverErrorMessages.push(err.message);
      },
    });
  }

  get name() {
    return this.entryForm.get('name');
  }

  get description() {
    return this.entryForm.get('description');
  }
  get type() {
    return this.entryForm.get('type');
  }
  get amount() {
    return this.entryForm.get('amount');
  }
  get paid() {
    return this.entryForm.get('paid');
  }
  get category() {
    return this.entryForm.get('category');
  }
  get categoryId() {
    return this.entryForm.get('categoryId');
  }
  get date() {
    return this.entryForm.get('date');
  }

  get typeOptions(): Array<any> {
    return Object.entries(this.types).map(([value, text]) => ({
      text: text,
      value: value,
    }));
  }
}
