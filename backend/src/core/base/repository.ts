import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { PrismaClient, PrismaPromise } from '@prisma/client';

@Injectable()
export abstract class Repository<TInput, TOutput> {
  private model: any;

  constructor(
    private database: PrismaClient,
    modelName: keyof PrismaClient,
  ) {
    this.model = this.database[modelName];
  }

  /**
   * @param option - Indicates the filter to be used in the query
   * @returns - The same option with the skip property modified or the same option if skip and take is not present
   */
  private paginate(option: any) {
    const { skip, take } = option;

    if (skip && take) {
      return { ...option, skip: (skip - 1) * take };
    }

    return option;
  }

  protected get select() {
    return {};
  }

  /**
   * @param option - Indicates the filter to be used in the query
   * @returns - Returns a list of entities that match the filter
   */
  protected async find<TFilter>(option: TFilter): Promise<TOutput[]> {
    const modifiedOption = this.paginate(option);

    return this.model.findMany({ ...modifiedOption });
  }

  /**
   * @description - Returns one entity in the database or undefined
   * @param option - Indicates the filter to be used in the query
   * @returns - Returns one entity that match the filter
   */
  protected async findOne<TFilter>(option: TFilter): Promise<TOutput> {
    return this.model.findFirst({ ...option });
  }

  /**
   * @description - Creates an entity in the database
   * @param data - Indicates the data to be inserted
   * @returns - Returns the entity created
   */
  public async create(data: TInput): Promise<TOutput> {
    return this.model.create({
      ...this.select,
      data,
    });
  }

  /**
   * @description - Updates or create (if not found) an entity in the database
   * @param id - Indicates the id of the entity to be updated
   * @param data - Indicates the data to be updated
   * @returns - Returns the entity created or updated
   */
  public async upsert(id: string | undefined, data: TInput): Promise<TOutput> {
    return this.model.upsert({
      ...this.select,
      create: data,
      update: data,
      where: { id: id || randomUUID() },
    });
  }

  /**
   * @description - Creates multiple entities in the database
   * @param data - Indicates the data to be inserted
   * @returns - Returns the entities created
   */
  public async createMany(data: Array<TInput>): Promise<TOutput[]> {
    return this.database.$transaction(
      data.map((item) => this.model.create({ data: item })) as PrismaPromise<TOutput>[],
    );
  }

  /**
   * @description - Updates an entity in the database
   * @param data - Indicates the data to be updated
   * @returns - Returns the entity updated
   */
  public async update(data: TInput): Promise<TOutput> {
    return this.model.update({
      ...this.select,
      data,
      where: { id: (data as any).id },
    });
  }

  /**
   * @description - Find an entity in the database by id
   * @param data - Indicates the data to be updated
   * @returns - Returns the entity requested or undefined
   */
  public async findById(id: string): Promise<TOutput> {
    return this.model.findFirst({
      ...this.select,
      where: { id },
    });
  }

  /**
   * @description - Finds all entities in the database
   * @returns - Returns an array of entities or empty array
   */
  public async findMany(): Promise<TOutput[]> {
    return this.model.findMany({
      ...this.select,
    });
  }

  /**
   * @description - Deletes an entity in the database
   * @param id - Indicates the id of the entity to be deleted
   * @returns - Returns the entity deleted
   */
  public async delete(id: string): Promise<TOutput> {
    return this.model.delete({
      ...this.select,
      where: { id },
    });
  }

  /**
   * @description - Deletes multiple entities in the database
   * @param ids - Indicates the ids of the entities to be deleted
   * @returns - Returns the entities deleted
   */
  public async deleteMany(ids: string[]): Promise<TOutput[]> {
    return this.database.$transaction(
      ids.map((id) =>
        this.model.delete({
          ...this.select,
          where: { id },
        }),
      ) as PrismaPromise<TOutput>[],
    );
  }

  /**
   * @description - Counts the number of entities in the database
   * @param pageLimit - Indicates the number of entities per page
   * @returns - Returns the number of entities in the database
   *           or the number of pages if pageLimit is provided
   */
  public async count(pageLimit: number): Promise<number> {
    const totalData = await this.model.count();
    if (pageLimit) {
      return Math.ceil(totalData / pageLimit);
    }

    return totalData;
  }
}
