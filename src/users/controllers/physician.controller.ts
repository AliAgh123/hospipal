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

  @Post('/physician/signup')
  create(@Body() createPhysicianDto: CreatePhysicianDto) {
    return this.physiciansService.createPhysician(createPhysicianDto);
  }

  @Get('/physician')
  findAll() {
    const userPromise = this.physiciansService.findAllPhysicians();
    userPromise
      .then((users) => {
        // Check if the array is empty
        if (users.length === 0) {
          return 'no physicians exist';
        } else {
          console.log('The array of users is not empty');
        }
      })
      .catch((error) => {
        console.error('An error occurred while fetching users:', error);
      });
    return userPromise;
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
  @Delete('physician/:id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.physiciansService.removePhysician(+id);
      if (result && result.affected !== undefined && result.affected === 0) {
        return 'physician not found';
      } else {
        return 'physician ${id} deleted successfully.';
      }
    } catch (error) {
      console.error('An error occurred while deleting rows:', error);
      return 'An error occurred while deleting rows.';
    }
  }
}
