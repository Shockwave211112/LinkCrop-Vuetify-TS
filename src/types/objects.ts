export type NotifyFunction = (message: string, color?: string, timeout?: number) => void;

export interface Notify {
  visible: boolean,
  timeout: number,
  color: string,
  message: string,
  id: string,
}
