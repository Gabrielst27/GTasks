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
}

function test() {
  const e = new UserEntity({
    name: 'a',
    email: 'asa',
    password: 'asdas',
  });
  console.log(e);
}
test();
