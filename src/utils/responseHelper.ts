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
    timestamp: CURRENT_DATE(),
  };
};
