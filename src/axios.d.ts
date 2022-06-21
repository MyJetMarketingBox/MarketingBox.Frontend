import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    isClientRequest?: boolean;
    notification?: string;
    errorAlert?: string;
  }
}
