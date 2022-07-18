import { Category } from './categories/shared/category.model';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Entry } from './entries/shared/entry.model';

export class InMemoryDataService implements InMemoryDbService {
  createDb(
    reqInfo?: RequestInfo | undefined
  ): {} | Observable<{}> | Promise<{}> {
    const categories: Category[] = [
      { id: 1, name: 'Lazer', description: 'Cinema, parques e etc' },
      { id: 2, name: 'Moradia', description: 'Aluguel, agua e luz' },
      { id: 3, name: 'Saúde', description: 'Plano de Saúde e remédios' },
      { id: 4, name: 'Educação', description: 'Cursos, livros e etc' },
      { id: 5, name: 'Combustíveis', description: 'Gasolina, álcool e etc' },
      { id: 6, name: 'Roupas', description: 'Calças, camisas e etc' },
      { id: 7, name: 'Receitas', description: 'Sálario, vendas ...' },
    ];

    const entries: Entry[] = [
      {
        id: 1,
        name: 'Gás',
        description: 'Gás de cozinha',
        type: 'Despesa',
        date: '',
        amount: 120.0,
        paid: true,
        categoryId: 1,
        category: categories[0],
      },
      {
        id: 2,
        name: 'Água',
        description: 'Água de cozinha',
        type: 'Despesa',
        date: '',
        amount: 50.0,
        paid: true,
        categoryId: 2,
        category: categories[1],
      },
      {
        id: 3,
        name: 'Luz',
        description: 'Luz de cozinha',
        type: 'Despesa',
        date: String(new Date()),
        amount: 80.0,
        paid: true,
        categoryId: 3,
        category: categories[2],
      },
      {
        id: 4,
        name: 'Joalharia',
        description: 'Joalharia de cozinha',
        type: 'Despesa',
        date: String(new Date()),
        amount: 80.0,
        paid: true,
        categoryId: 4,
        category: categories[3],
      },
      {
        id: 5,
        name: 'Combustível',
        description: 'Combustível do carro',
        type: 'Despesa',
        date: '',
        amount: 400.0,
        paid: true,
        categoryId: 5,
        category: categories[4],
      },
      {
        id: 6,
        name: 'Salario',
        description: 'Salario do funcionario',
        type: 'Receita',
        date: String(new Date()),
        amount: 1000.0,
        paid: true,
        categoryId: 7,
        category: categories[6],
      },
    ];
    return { categories, entries };
  }
}
