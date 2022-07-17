import { Category } from './../shared/category.model';
import { CategoryService } from './../category.service';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { success, error } from 'toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  currentAction: string = '';
  categoryForm: FormGroup = this.formBuilder.group({
    id: [null],
    name: [null, [Validators.required, Validators.minLength(2)]],
    description: [null, [Validators.required, Validators.minLength(10)]],
  });

  pageTitle: string = '';
  serverErrorMessages: string[] = [];
  submitingForm: boolean = false;
  category: Category = new Category();

  get name() {
    return this.categoryForm.get('name');
  }

  get description() {
    return this.categoryForm.get('description');
  }

  // Setando valor do titula da pagina assim que o componente é carregado
  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Cadastro de Nova Categoria';
    } else {
      this.pageTitle = 'Editando Categoria: ' + this.category.name;
    }
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.loadCategory();
  }

  private setCurrentAction() {
    this.route.snapshot.url[0].path === 'new'
      ? (this.currentAction = 'new')
      : (this.currentAction = 'edit');

    const id = this.route.snapshot.paramMap.get('id');

    if (this.currentAction === 'edit' && id) {
      this.category.id = parseInt(id);
    }
  }

  private loadCategory() {
    if (this.currentAction === 'edit' && this.category.id) {
      this.categoryService.getById(this.category.id).subscribe({
        next: (category) => {
          this.category = category;
          this.categoryForm.patchValue(category);
        },
        error: (error) => this.serverErrorMessages.push(error.message),
      });
    }
  }

  submitForm() {
    this.submitingForm = true;

    if (this.currentAction === 'new') {
      this.createCategory();
    } else {
      this.updateCategory();
    }
  }
  updateCategory() {
    const category: Category = Object.assign(
      new Category(),
      this.categoryForm.value
    );
    this.categoryService.update(category).subscribe({
      next: (category) => {
        this.actionSuccess(category);
      },
      error: (error) => this.actionError(error),
    });
  }

  createCategory() {
    const category: Category = Object.assign(
      new Category(),
      this.categoryForm.value
    );
    this.categoryService.create(category).subscribe({
      next: (category) => {
        this.actionSuccess(category);
      },
      error: (error) => this.actionError(error),
    });
  }
  actionError(error: any): void {
    error('Ocorreu um erro ao processar sua requisição: ' + error.message);
    this.submitingForm = false;
    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Falha na comunicação com o servidor'];
    }
  }
  actionSuccess(category: Category) {
    if (this.currentAction === 'new') {
      success(`Categoria cadastrada com sucesso!`);
      this.router.navigateByUrl('categories', {
        skipLocationChange: true,
      });
    } else {
      success(`Categoria alterada com sucesso!`);
      this.router.navigateByUrl('categories', {
        skipLocationChange: true,
      });
    }
  }
}
