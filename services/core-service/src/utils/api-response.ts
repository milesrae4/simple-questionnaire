export interface ApiResponse<T> {
  data: T;
}

export interface ApiError {
  error: string;
}

export const isErrorResponse = (
  response: ApiError | ApiResponse<any>,
): response is ApiError => {
  return !!(response as ApiError).error;
};
