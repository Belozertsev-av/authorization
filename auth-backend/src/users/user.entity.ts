import { Table, Column, Model, Unique } from "sequelize-typescript"
import { IsNotEmpty, MinLength } from "class-validator"

@Table
export class User extends Model {
  @Unique
  @IsNotEmpty()
  @Column
  declare login: string

  @Unique
  @IsNotEmpty()
  @Column
  declare tabel: number

  @IsNotEmpty()
  @MinLength(6)
  @Column
  declare password: string
}
