type ConstraintError = {
  fields: string[];
};

type DriverAdapterErrorCause = {
  originalCode: string;
  originalMessage: string;
  kind: string;
  constraint: ConstraintError;
};

type DriverAdapterError = {
  name: string;
  cause: DriverAdapterErrorCause;
};

type PrismaErrorMeta = {
  modelName: string;
  driverAdapterError: DriverAdapterError;
};

export type PrismaError = {
  code: string;
  meta: PrismaErrorMeta;
  clientVersion: string;
  name: string;
};
