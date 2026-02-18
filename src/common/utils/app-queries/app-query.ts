import { EDbOperators } from 'src/common/enum/db-operators.enum';
import { AppQueryValidatorFactory } from 'src/common/utils/app-queries/app-query.validator';

export type AppQueryProps = {
  field: string;
  value: string;
  operator: EDbOperators;
};

export class AppQuery {
  readonly field: string;
  readonly value: string;
  readonly operator: EDbOperators;
  constructor(props: AppQueryProps) {
    AppQuery.validate(props);
    this.field = props.field;
    this.value = props.value;
    this.operator = props.operator;
  }

  static validate(props: AppQueryProps): void {
    const validator = AppQueryValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new Error('Query inválida');
    }
  }
}
