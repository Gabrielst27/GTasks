import { Project } from 'generated/prisma/client';
import { EDbOperators } from 'src/common/enum/db-operators.enum';
import { ProjectEntity } from 'src/modules/projects/entities/project.entity';

export class ProjectPrismaModelMapper {
  static toEntity(model: Project): ProjectEntity {
    return new ProjectEntity(
      {
        ...model,
        description: model.description || undefined,
      },
      model.id,
    );
  }

  static toModel(entity: ProjectEntity): Project {
    return entity.toJson();
  }

  static enumToOperator(opEnum: EDbOperators) {
    const mapper = {
      equal: 'equals',
      in: 'in',
      not_in: 'notin',
      lesser_than: 'lt',
      lesser_than_or_equal: 'lte',
      greater_than: 'gt',
      greater_than_or_equal: 'gte',
      not: 'not',
      contains: 'contains',
    };
    return mapper[opEnum];
  }
}
