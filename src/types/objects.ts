export type NotifyFunction = (
  message: string,
  color?: string,
  timeout?: number
) => void;

export interface Notify {
  visible: boolean,
  timeout: number,
  color: string,
  message: string,
  id: string,
}

export interface User {
  id: number,
  email: string,
  name: string,
  roles?: object[],
  created_at: string,
  email_verified_at: string,
}

export interface Link {
  id: number,
  name: string,
  description: string,
  origin: string,
  referral: string,
  updated_at: string,
  created_at: string,
  groups: number[],
}

export interface Group {
  id: number,
  name: string,
  description: string,
  count: number,
  updated_at: string,
  created_at: string,
}
