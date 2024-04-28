import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.phoneNumbers = createUserDto.phoneNumbers;
    user.dateOfBirth = createUserDto.dateOfBirth;
    user.country = createUserDto.country;
    user.street = createUserDto.street;
    user.city = createUserDto.city;
    user.gender = createUserDto.gender;
    return this.userRepository.save(user);
  }

  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  viewUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();
    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    user.phoneNumbers = ['96178918785', 'ijlj']; //updateUserDto.phoneNumbers;
    user.password = updateUserDto.password;
    user.dateOfBirth = updateUserDto.dateOfBirth;
    user.country = updateUserDto.country;
    user.street = updateUserDto.street;
    user.city = updateUserDto.city;
    user.gender = updateUserDto.gender;
    return this.userRepository.save(user);
  }

  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}
