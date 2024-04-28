import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PhysicianService } from '../services/physician.service';
import { CreatePhysicianDto } from '../dto/create-physician.dto';
import { UpdatePhysicianDto } from '../dto/update-physician.dto';

@Controller('users')
@UsePipes(new ValidationPipe())
export class PhysiciansController {
  constructor(private readonly physiciansService: PhysicianService) {}

  @Post('/physician')
  create(@Body() createPhysicianDto: CreatePhysicianDto) {
    return this.physiciansService.createPhysician(createPhysicianDto);
  }

  @Get('/physician')
  findAll() {
    return this.physiciansService.findAllPhysicians();
  }

  @Get('/physician/:id')
  findOne(@Param('id') id: string) {
    return this.physiciansService.viewPhysician(+id);
  }

  @Patch('/physician/:id')
  update(
    @Param('id') id: string,
    @Body() updatePhysicianDto: UpdatePhysicianDto,
  ) {
    return this.physiciansService.updatePhysician(+id, updatePhysicianDto);
  }

  @Delete('/physician/:id')
  remove(@Param('id') id: string) {
    return this.physiciansService.removePhysician(+id);
  }
}
