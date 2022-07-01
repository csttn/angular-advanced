export class Category {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string
  ) {}

  public static fromJson(jsonData: any): Category {
    return new Category(jsonData.id, jsonData.name, jsonData.description);
  }
}
