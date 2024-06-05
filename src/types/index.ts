import { Readable } from "stream";

export type RequestPayload = string | object | Buffer | Readable | any;
export type ResponsePayload = {
  data: object | string | number;
  status?: string;
  success?: boolean;
  code?: number;
};

export type TUser = {
  email: string;
  password: string;
};

export interface IUser extends TUser, Document {}

export type AuthStatus =
  | "SUCCESS"
  | "NOT_EXIST"
  | "INVALID_CREDENTIAL"
  | "ALREADY_EXSIST";

export type IpDetail = {
  ip: string;
  network: string;
  version: string;
  city: string;
  region: string;
  region_code: unknown;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3: string;
  country_capital: string;
  country_tld: string;
  continent_code: string;
  in_eu: boolean;
  postal: unknown;
  latitude: number;
  longitude: number;
  timezone: unknown;
  utc_offset: unknown;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  country_area: number;
  country_population: number;
  asn: string;
  org: string;
};

export type Attribute = {
  trait_type: string;
  value: string | number | Date;
};

export type Metadata = {
  name: string;
  description: string;
  image: string;
  length: number;
  attributes: Attribute[];
};
