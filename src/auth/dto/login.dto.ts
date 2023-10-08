import { IsString, IsNotEmpty, IsStrongPassword } from 'class-validator';
export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
