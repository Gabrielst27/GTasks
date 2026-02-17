import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { SharedModule } from 'src/modules/shared/shared.module';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { IProjectRepository } from 'src/modules/projects/repositories/projects.repository';
import { ProjectsPrismaRepository } from 'src/modules/projects/repositories/prisma/projects-prisma.repository';

@Module({
  imports: [SharedModule],
  controllers: [ProjectsController],
  providers: [
    PrismaService,
    {
      provide: 'Repository',
      useFactory: (prismaService: PrismaService) => {
        return new ProjectsPrismaRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: ProjectsService,
      useFactory: (repository: IProjectRepository) => {
        return new ProjectsService(repository);
      },
      inject: ['Repository'],
    },
  ],
})
export class ProjectsModule {}
