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
        name: 'Cinema',
        description: 'Capitão do filme',
        type: 'Despesa',
        date: '14/10/2019',
        amount: 120.0,
        paid: true,
        categoryId: categories[0].id,
        category: categories[0],
      },
      {
        id: 2,
        name: 'Água',
        description: 'Água de cozinha',
        type: 'Despesa',
        date: '14/10/2019',
        amount: 50.0,
        paid: true,
        categoryId: categories[1].id,
        category: categories[1],
      },
      {
        id: 3,
        name: 'Luz',
        description: 'Luz de cozinha',
        type: 'Despesa',
        date: '14/10/2019',
        amount: 80.0,
        paid: true,
        categoryId: categories[2].id,
        category: categories[2],
      },
      {
        id: 4,
        name: 'Joalharia',
        description: 'Joalharia de cozinha',
        type: 'Despesa',
        date: '14/10/2019',
        amount: 80.0,
        paid: true,
        categoryId: categories[3].id,
        category: categories[3],
      },
      {
        id: 5,
        name: 'Combustível',
        description: 'Combustível do carro',
        type: 'Despesa',
        date: '14/10/2019',
        amount: 400.0,
        paid: true,
        categoryId: categories[4].id,
        category: categories[4],
      },
      {
        id: 6,
        name: 'Salario',
        description: 'Salario do funcionario',
        type: 'Receita',
        date: '14/10/2019',
        amount: 1000.0,
        paid: false,
        categoryId: categories[6].id,
        category: categories[6],
      },
    ];
    return { categories, entries };
  }
}
