import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  id: number;

  @IsEmail(undefined, { message: 'Please provide valid Email.' })
  email: string;
  @IsNotEmpty()
  password: string;
}
