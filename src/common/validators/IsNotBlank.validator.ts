import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsNotBlankConstraint' })
export class IsNotBlankConstraint implements ValidatorConstraintInterface {
  validate(str: string) {
    return typeof str === 'string' && str.trim().length > 0;
  }

  defaultMessage(): string {
    return '$property should not be empty';
  }
}

export function IsNotBlank(validationOptions?: ValidationOptions) {
  return function (obj: object, propertyName: string) {
    registerDecorator({
      name: 'IsNotBlank',
      target: obj.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsNotBlankConstraint,
    });
  };
}
