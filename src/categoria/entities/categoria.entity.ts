import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity"; 
import { Transform, TransformFnParams } from "class-transformer";

@Entity({name:"tb_categoria"})
export class Categoria{
    @PrimaryGeneratedColumn()
    id:number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length:255, nullable:false})
    categoria:string

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length:500, nullable:false})
    descricao:string

    @OneToMany(() => Produto, (produto) => produto.categoria)
    produto: Produto[];

}