/*
    ServiceError Model - Used for standardized error response
    @Param(message: string) - the error message if any
    @Param(code: string) - the code usually error code if any
    @Param(statusCode: number) - the response status code if any

*/
export class ServiceError {
  message: string;
  code: string;
  statusCode: number;

  constructor(init: Partial<ServiceError>) {
    Object.assign(this, init);
  }
}
/*
    ServiceResponse Model - Used for standardized response from any service
    @Param(error: ServiceError) - ServiceError object with more information provided to describe the error
    @Param(data: any) - the response data that the service will return

    USAGE:
    ---------
    Can be created as a separate object and custom modify the parameters but usually we have 2 static methods that can be called:
    - OK(res) - res as data for the response
    - Error(err) - err as error message

    when using this model as response from service first check if isError() is false then get the data.

*/

export default class ServiceResponse {
  static OK = (data = null) => new ServiceResponse({ data: data });
  static Error = (error) => {
    if (typeof error === 'string') {
      return new ServiceResponse({
        error: new ServiceError({
          message: error,
        }),
      });
    } else {
      return new ServiceResponse({
        error: new ServiceError({
          message: error.message,
          code: error.code,
        }),
      });
    }
  };

  error: ServiceError = null;
  data: any = null;

  constructor(init: Partial<ServiceResponse>) {
    Object.assign(this, init);
  }

  isError(): boolean {
    if (this.error) {
      return true;
    }
    return false;
  }
}
