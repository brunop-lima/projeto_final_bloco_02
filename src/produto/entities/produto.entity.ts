import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { NumericTransformer } from "../../util/numerictransformer";

@Entity({name: 'tb_produtos'})
export class Produto {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    nome: string;
    
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @Column({type: 'decimal', precision: 10, scale: 2, nullable: false, transformer: new NumericTransformer()})
    preco: number;

    @IsNotEmpty()
    @Column({length: 5000})
    foto: string;


    // Relacionamento com Categoria
    //@ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        //onDelete: "CASCADE"
    //})
}