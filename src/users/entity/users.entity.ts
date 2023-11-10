import { Column, Entity } from 'typeorm';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { Exclude } from 'class-transformer';
import { BaseModel } from 'src/common/entity/base.entity';
import { stringValidationMessage } from 'src/common/validation-message/string-validation.message';
import { emailValidationMessage } from 'src/common/validation-message/email-validation.message';
import { passwordValidationMessage } from 'src/common/validation-message/password-validation.message';

@Entity()
export class UsersModel extends BaseModel {
  @Column({ unique: true })
  @IsString({ message: stringValidationMessage })
  @IsEmail({}, { message: emailValidationMessage })
  email: string;

  @Column()
  @IsString({ message: stringValidationMessage })
  @IsStrongPassword(
    {
      minLength: 12,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    { message: passwordValidationMessage },
  )
  @Exclude({ toPlainOnly: true })
  password: string;
}
