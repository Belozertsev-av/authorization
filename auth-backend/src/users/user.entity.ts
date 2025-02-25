import { Table, Column, Model, Unique } from "sequelize-typescript"
import { IsNotEmpty, MinLength } from "class-validator"

@Table
export class User extends Model {
  @Unique
  @IsNotEmpty()
  @Column
  login: string

  @Unique
  @IsNotEmpty()
  @Column
  tabel: number

  @IsNotEmpty()
  @MinLength(6)
  @Column
  password: string
}
