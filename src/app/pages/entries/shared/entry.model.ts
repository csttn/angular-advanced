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

  public static jsonDataToEntries(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];

    jsonData.forEach((element) => {
      const entry = Object.assign(new Entry(), element);
      entry.category = Category.fromJson(element.category);
      entries.push(entry);
    });
    return entries;
  }

  static types = {
    expense: 'Despesa',
    revenue: 'Receita',
  };
}
