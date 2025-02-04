import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";

@Injectable()
export class ProdutoService{
    constructor(
        
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>
    ){}

    async findAll(): Promise<Produto[]>{
        return this.produtoRepository.find(
            {
            relations: {
                categoria: true,
            }
        }
    )
    }

   async findById(id: number): Promise<Produto>{
     const produto = await this.produtoRepository.findOne({
            where: {
                id
            },
            relations: {
                categoria: true,
            }
        })

        if(!produto)
            throw new HttpException(' Produto não encontrado!', HttpStatus.NOT_FOUND)
        
        return produto;
    }

    async findByName(nome: string): Promise<Produto[]>{
        const produto = await  this.produtoRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations: {
                categoria: true,
            }
        })
        if (produto.length === 0) {  
            throw new HttpException(`⚠️ Nenhum resultado encontrado com o ${nome}`, HttpStatus.NOT_FOUND);
            }  
        return produto;
    }


    async create(produto: Produto): Promise<Produto>{

        return await this.produtoRepository.save(produto)
    }

    async update(produto: Produto): Promise<Produto>{

        await this.findById(produto.id)

        return await this.produtoRepository.save(produto)
    }

    
    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id)

        const del = await this.produtoRepository.delete(id)

        if(id)
           throw new HttpException("Produto Deletado com Sucesso! ✔", HttpStatus.OK)
        return del

        }
  

}