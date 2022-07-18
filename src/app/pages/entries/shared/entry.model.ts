import { Category } from './../../categories/shared/category.model';
export class Entry {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public type?: string,
    public date?: string,
    public amount?: number,
    public paid?: boolean,
    public categoryId?: number,
    public category?: Category
  ) {}

  public static fromJson(jsonData: any): Entry {
    return new Entry(jsonData.id, jsonData.name, jsonData.description);
  }

  static types = {
    expense: 'Despesa',
    revenue: 'Receita',
  };
}
