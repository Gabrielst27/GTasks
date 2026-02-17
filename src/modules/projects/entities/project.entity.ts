import { Entity, EntityProps } from 'src/common/entities/entity';

export type ProjectEntityProps = {
  name: string;
  description?: string;
} & EntityProps;

export class ProjectEntity extends Entity<ProjectEntityProps> {
  private readonly _name: string;
  private readonly _description: string;

  constructor(
    private readonly props: ProjectEntityProps,
    id?: string,
  ) {
    //TODO: Create project entity validation
    super(props, id);
    this._description = props.description ?? '';
  }
}
