import { CURRENT_DATE } from './dateUtils';

export interface IResponseData {
  data?: any;
  error?: any;
  timestamp: string;
}

export const httpOk = (result?: any): IResponseData => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  return {
    data: result,
    error: result?.message,
    timestamp: CURRENT_DATE(),
  };
};

export enum STATUS_CODE {
  CONTINUE = 100,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  REQUEST_TIMEOUT = 408,
  UNPROCESSABLE_ENTITY = 422,
  INVALID_REQUEST = 423,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIME_OUT = 504,
}
