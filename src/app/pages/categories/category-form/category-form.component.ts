import { Category } from './../shared/category.model';
import { CategoryService } from './../category.service';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
    description: [null],
  });

  pageTitle: string = '';
  serverErrorMessages: string[] = [];
  submitingForm: boolean = false;
  category: Category = new Category();

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

  onSaveCategory() {
    this.submitingForm = true;
    if (this.currentAction === 'new') {
      this.categoryService.create(this.categoryForm.value).subscribe({
        next: (category) => {
          this.submitingForm = false;
          this.router.navigateByUrl('categories');
        },
        error: (error) => {
          this.submitingForm = false;
          if (error.status === 400) {
            this.serverErrorMessages.push(error.error);
          } else {
            this.serverErrorMessages.push(
              'Falha na comunicação com o servidor'
            );
          }
        },
      });
    }
  }

  onUpdateCategory() {
    this.submitingForm = true;
    this.categoryService.update(this.categoryForm.value).subscribe({
      next: (category) => {
        this.submitingForm = false;
        console.log(category);
      },
      error: (error) => {
        this.submitingForm = false;
        if (error.status === 400) {
          this.serverErrorMessages.push(error.error);
        } else {
          this.serverErrorMessages.push('Falha na comunicação com o servidor');
        }
      },
    });
  }
}
