import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  constructor(private categoryService: CategoryService) {}

  categories: Category[] = [];

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (categories) => (this.categories = categories),
      error: (err) => alert('Erro ao carregar a lista de categorias' + err),
    });
  }

  delete(category: Category): void {
    const mustDelete = confirm(
      `Deseja realmente excluir a categoria ${category.name}?`
    );
    if (category.id && mustDelete) {
      this.categoryService.delete(category.id).subscribe({
        next: () => {
          const index = this.categories.indexOf(category);
          this.categories.splice(index, 1);
        },
        error(err) {
          alert('Erro ao deletar a categoria' + err);
        },
      });
    }
  }
}
