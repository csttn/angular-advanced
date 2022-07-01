import { Category } from './categories/shared/category.model';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

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
    ];

    return { categories };
  }
}
