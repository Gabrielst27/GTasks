import { Project } from 'generated/prisma/client';
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
}
