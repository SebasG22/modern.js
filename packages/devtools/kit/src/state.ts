import type { ClientDefinition } from './client';
import type {
  AppContext,
  BuilderConfig,
  BuilderContext,
  BundlerConfig,
  DevtoolsConfig,
  DoctorManifestOverview,
  FileSystemRoutes,
  FrameworkConfig,
  NormalizedBuilderConfig,
  TransformedFrameworkConfig,
} from './server';
import { PromiseStub, type DeepToResolvers } from './promise';

export interface ServerExportedState {
  framework: {
    context: Promise<AppContext>;
    config: {
      resolved: Promise<FrameworkConfig>;
      transformed: Promise<TransformedFrameworkConfig>;
    };
  };
  builder: {
    context: Promise<BuilderContext>;
    config: {
      resolved: Promise<BuilderConfig>;
      transformed: Promise<NormalizedBuilderConfig>;
    };
  };
  bundler: {
    configs: {
      resolved: Promise<BundlerConfig[]>;
      transformed: Promise<BundlerConfig[]>;
    };
  };
  definition: Promise<ClientDefinition>;
  doctor: Promise<DoctorManifestOverview | void>;
  devtoolsConfig: Promise<DevtoolsConfig>;
  performance: Promise<{ compileDuration: number }>;
  dependencies: Record<string, string>;
  fileSystemRoutes: Record<string, FileSystemRoutes>;
}

export type ServerExportedStateResolvers = DeepToResolvers<ServerExportedState>;

export interface ServerExportedStateResult {
  resolvers: ServerExportedStateResolvers;
  state: ServerExportedState;
}

export const createServerExportedState = (): ServerExportedStateResult => {
  const resolvers: ServerExportedStateResolvers = {
    framework: {
      context: PromiseStub.create(),
      config: {
        resolved: PromiseStub.create(),
        transformed: PromiseStub.create(),
      },
    },
    builder: {
      context: PromiseStub.create(),
      config: {
        resolved: PromiseStub.create(),
        transformed: PromiseStub.create(),
      },
    },
    bundler: {
      configs: {
        resolved: PromiseStub.create(),
        transformed: PromiseStub.create(),
      },
    },
    definition: PromiseStub.create(),
    doctor: PromiseStub.create(),
    devtoolsConfig: PromiseStub.create(),
    performance: PromiseStub.create(),
    dependencies: {},
    fileSystemRoutes: {},
  };
  const state: ServerExportedState = {
    framework: {
      context: resolvers.framework.context.promise,
      config: {
        resolved: resolvers.framework.config.resolved.promise,
        transformed: resolvers.framework.config.transformed.promise,
      },
    },
    builder: {
      context: resolvers.builder.context.promise,
      config: {
        resolved: resolvers.builder.config.resolved.promise,
        transformed: resolvers.builder.config.transformed.promise,
      },
    },
    bundler: {
      configs: {
        resolved: resolvers.bundler.configs.resolved.promise,
        transformed: resolvers.bundler.configs.transformed.promise,
      },
    },
    definition: resolvers.definition.promise,
    doctor: resolvers.doctor.promise,
    devtoolsConfig: resolvers.devtoolsConfig.promise,
    performance: resolvers.performance.promise,
    dependencies: resolvers.dependencies as any,
    fileSystemRoutes: resolvers.fileSystemRoutes as any,
  };
  return { resolvers, state };
};
