import { ValidationArguments } from 'class-validator';

export const passwordValidationMessage = (args: ValidationArguments) => {
  const { minLength, minSymbols } = args.constraints[0];
  return `${args.property}는 최소 ${minLength}자 이상이어야 하며, 소문자, 대문자, 숫자, 특수 문자(기호)가 ${minSymbols}개 이상 포함되어야 합니다!`;
};
