import { Entity, EntityProps } from 'src/common/entities/entity';
import { Role } from 'src/domain/users/enum/role.enum';

export type UserEntityProps = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role?: Role;
} & EntityProps;

export class UserEntity extends Entity<UserEntityProps> {
  constructor(props: UserEntityProps, id?: string) {
    //TODO: Create user entity validation
    props.avatar = props.avatar ?? '';
    props.role = props.role || Role.USER;
    super(props, id);
  }

  updateProps(partialProps: Partial<UserEntityProps>): UserEntity {
    //TODO: Create user entity validation
    const props = {
      ...this.props,
      ...partialProps,
    };
    super.updateProps(props);
    return this;
  }
}
