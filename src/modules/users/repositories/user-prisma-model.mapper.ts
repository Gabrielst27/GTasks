import { Role, User } from 'generated/prisma/client';
import { UserEntity } from 'src/domain/users/entities/user-entity';
import { Role as AppRole } from 'src/domain/users/enum/role.enum';

export class UserPrismaModelMapper {
  static toEntity(model: User): UserEntity {
    const entity = new UserEntity(
      {
        ...model,
        role: UserPrismaModelMapper.roleToAppEnum(model.role),
        avatar: model.avatar ?? undefined,
      },
      model.id,
    );
    return entity;
  }

  static toModel(entity: UserEntity): User {
    const json = entity.toJson();
    return {
      ...json,
      role: UserPrismaModelMapper.roleToModelEnum(json.role),
    };
  }

  static roleToAppEnum(role: Role): AppRole {
    const mapper = {
      USER: AppRole.USER,
      ADMIN: AppRole.ADMIN,
    };
    return mapper[role];
  }

  static roleToModelEnum(role: AppRole): Role {
    const mapper = {
      user: Role.USER,
      admin: Role.ADMIN,
    };
    return mapper[role];
  }
}
