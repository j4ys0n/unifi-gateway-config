export type GenericObject = {
  [key: string]: any;
}

export type HttpReqOptions = {
  url: string;
  headers?: GenericObject;
  method?: string;
  body?: any;
}
