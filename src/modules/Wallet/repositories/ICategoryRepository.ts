import { Category } from "../domain/category/category";

export interface ICategoryRepository {
  findById(id: string): Promise<Category>
  findAll(skip: number, take: number): Promise<any>
  save(wallet: Category): Promise<void>
  create(category: Category): Promise<void>
}