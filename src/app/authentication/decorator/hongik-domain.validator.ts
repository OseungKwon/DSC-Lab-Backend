import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

/** Allowed Hongik Email Domain
 *
 * This has possibility of added or changed in future
 *
 * Use this validation decorator with @IsEmail()
 */

export function IsHongikEmailDomain() {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsHongikEmailDomain',
      target: object.constructor,
      async: false,
      propertyName,
      constraints: ['mail.hongik.ac.kr'],
      validator: {
        validate(value: string, argument: ValidationArguments) {
          /** Get domain of user input */
          const getDomainOfValue = value.split('@').pop();

          return argument.constraints.includes(getDomainOfValue);
        },
        /**
         * Gets default message when validation for this constraint fail.
         */
        defaultMessage(validationArguments: ValidationArguments) {
          return `Email domain should be type of Hongik University Domain: ${validationArguments.constraints.join(
            ', ',
          )}`;
        },
      },
    });
  };
}
