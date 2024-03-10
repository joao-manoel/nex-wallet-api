import { Category } from "@modules/Wallet/domain/category/category";
import { ICategoryRepository } from "../ICategoryRepository";
import { prisma } from "@infra/prisma/client";
import { CategoryMapper } from "@modules/Wallet/mappers/categoryMapper";

export class PrismaCategoryRepository implements ICategoryRepository {
  async findById(id: string): Promise<Category> {
    const category = await prisma.invoiceCategory.findUnique({
      where: {
        id
      }
    })

    if(!category) return null

    return CategoryMapper.toDomain(category)
  }

  async findAll(): Promise<any> {
    const categorys = await prisma.invoiceCategory.findMany({
      select: {
        id: true,
        name: true,
        color: true
      }
    })

    return CategoryMapper.toDto({categorys})

  }
  save(wallet: Category): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async create(category: Category): Promise<void> {
    const data = await CategoryMapper.toPersistence(category)

    await prisma.invoiceCategory.create({
      data
    })
  }
  
}