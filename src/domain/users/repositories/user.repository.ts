import { IRepository } from 'src/common/repositories/repository.interface';
import { UserEntity } from 'src/domain/users/entities/user-entity';

export interface UserRepository extends IRepository<UserEntity> {}
