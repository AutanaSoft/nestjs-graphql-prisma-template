import { Type } from '@nestjs/common'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class MetaModel {
  @Field(() => Number, { nullable: false })
  totalPages!: number
  @Field(() => Number, { nullable: false })
  currentPage!: number
  @Field(() => Number, { nullable: false })
  totalDocs!: number
  @Field(() => Number, { nullable: false })
  startDoc!: number
  @Field(() => Number, { nullable: false })
  endDoc!: number

  constructor(partial: Partial<MetaModel>) {
    Object.assign(this, partial)
  }
}

export class PaginatedOutput<T> {
  meta!: MetaModel
  docs!: T[]
}

export function Paginated<T>(ItemType: Type<T>): unknown {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedClass {
    @Field(() => MetaModel, { nullable: false })
    meta!: MetaModel
    @Field(() => [ItemType], { nullable: false })
    docs!: T[]

    constructor(partial: Partial<PaginatedClass>) {
      Object.assign(this, partial)
    }
  }
  return PaginatedClass
}
