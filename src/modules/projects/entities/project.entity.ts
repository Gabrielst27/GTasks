import { Entity, EntityProps } from 'src/common/entities/entity';

export type ProjectEntityProps = {
  name: string;
  description?: string;
} & EntityProps;

export class ProjectEntity extends Entity<ProjectEntityProps> {
  constructor(
    private props: ProjectEntityProps,
    id?: string,
  ) {
    //TODO: Create project entity validation
    super(props, id);
    props.description = props.description ?? '';
  }

  updateProps(partialProps: Partial<ProjectEntityProps>): ProjectEntity {
    //TODO: Create project entity validation
    const props = {
      ...this.props,
      ...partialProps,
    };
    super.updateProps(props);
    return this;
  }
}
