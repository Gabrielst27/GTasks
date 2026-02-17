import { Entity, EntityProps } from 'src/common/entities/entity';

export type ProjectEntityProps = {
  name: string;
  description?: string;
} & EntityProps;

export class ProjectEntity extends Entity<ProjectEntityProps> {
  constructor(
    private readonly props: ProjectEntityProps,
    id?: string,
  ) {
    //TODO: Create project entity validation
    super(props, id);
  }
}
