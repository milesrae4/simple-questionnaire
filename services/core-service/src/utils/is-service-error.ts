import { ServiceError } from './service-error';

export const isServiceError = (
  response: ServiceError | any,
): response is ServiceError => {
  return !!(response as ServiceError).type;
};
