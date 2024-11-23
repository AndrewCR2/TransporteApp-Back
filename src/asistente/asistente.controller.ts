import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { AsistenteService } from './asistente.service';
import { CreateAsistenteDto } from './dto/create-asistente.dto';
import { UpdateAsistenteDto } from './dto/update-asistente.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { FindByGroupDto } from 'src/common/dtos/findby-group.dto';

@Controller('asistente')
export class AsistenteController {
  constructor(private readonly asistenteService: AsistenteService) { }

  @Post()
  create(@Body() createAsistenteDto: CreateAsistenteDto) {
    return this.asistenteService.create(createAsistenteDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.asistenteService.findAll(paginationDto);
  }

  @Get('search')
  findOne(@Query('nombre') query: string) {
    return this.asistenteService.findOne(query);
  }

  @Get('search/:id')
  async findOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.asistenteService.findOneById(id);
  }


  @Get('search/group')
  async findByGroup(@Query() query: FindByGroupDto) {
    return this.asistenteService.findAByGroup(query.grupo);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateAsistenteDto: UpdateAsistenteDto) {
    return this.asistenteService.update(id, updateAsistenteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.asistenteService.remove(id);
  }
}
