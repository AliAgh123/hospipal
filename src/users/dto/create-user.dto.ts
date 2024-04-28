import {
  ArrayNotEmpty,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty()
  name: string;

  @IsEmail(undefined, { message: 'Please provide valid Email.' })
  email: string;

  @ArrayNotEmpty()
  phoneNumbers: string[];

  @IsDateString()
  dateOfBirth: Date;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  street: string;

  @IsString()
  @IsEnum(['F', 'M'])
  gender: 'M' | 'F';

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
      at least one uppercase letter, 
      one lowercase letter, 
      one number and 
      one special character`,
  })
  password: string;
}
