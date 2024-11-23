import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAsistenteDto } from './dto/create-asistente.dto';
import { UpdateAsistenteDto } from './dto/update-asistente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asistente } from './entities/asistente.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';



@Injectable()
export class AsistenteService {

  constructor(
    @InjectRepository(Asistente)
    private readonly asistenteRepository: Repository<Asistente>,
  ) { }


  async create(createAsistenteDto: CreateAsistenteDto) {

    try {
      const { ...asistenteData } = createAsistenteDto;

      const asistente = this.asistenteRepository.create({
        ...asistenteData,
      });

      const savedAsistente = await this.asistenteRepository.save(asistente);


      return {
        savedAsistente
      }

    } catch (error) {
      console.error(error);
      this.handleDBErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {

    try {

      const { limit = 10, offset = 0 } = paginationDto;

      const asistentes = await this.asistenteRepository.find({
        take: limit,
        skip: offset
      });

      return asistentes;
    } catch (error) {
      console.error(error);
      this.handleDBErrors(error);
    }

  }

  async findOne(nombre: string) {

    try {

      if (!nombre) {
        throw new BadRequestException('El parámetro "nombre" es obligatorio.');
      }

      const asistentes = await this.asistenteRepository.createQueryBuilder('asistente')
        .where('asistente.nombre ILIKE :nombreTerm OR asistente.apellido ILIKE :nombreTerm', {
          nombreTerm: `%${nombre}%`,
        })
        .getMany();

      if (asistentes.length === 0) {
        throw new NotFoundException(`No se encontraron asistentes con el nombre de ${nombre}`);
      }

      return asistentes;

    } catch (error) {

      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un error al procesar la solicitud. Por favor, intente más tarde.');
    }
  }

  async findOneById(id: string) {

    const user = await this.asistenteRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('Asistnte no encontrado');

    return user;
  }


  async findAByGroup(grupo: string) {

    const asistentes = await this.asistenteRepository.createQueryBuilder('asistente')
      .where('asistente.grupo = :grupoTerm', { grupoTerm: grupo })
      .getMany();

    if (asistentes.length === 0) {
      throw new NotFoundException(`No se encontraron asistentes con el grupo ${grupo}`);
    }

    return asistentes;

  }


  async update(id: string, updateAsistenteDto: UpdateAsistenteDto) {

    const { ...dataAsistente } = updateAsistenteDto;

    const asistente = await this.asistenteRepository.preload({ id, ...dataAsistente });


    if (!asistente) throw new NotFoundException('Asistnte no encontrado');

    return this.asistenteRepository.save(asistente)
  }

  async remove(id: string) {

    const user = await this.asistenteRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('Asistnte no encontrado');

    await this.asistenteRepository.remove(user);
    return { msg: `Asistente ${user.nombre} Eliminado` }

  }


  private handleDBErrors(error: any): never {

    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    throw new InternalServerErrorException('Please check server logs')
  }
  
}
