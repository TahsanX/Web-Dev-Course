export const USER_ROLE = {
    admin: "admin",
    agent: "agent",
    user: "user",
} as const
export type Roles = "admin" | "agent" | "user"
export interface IApiResponse<T = any> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  error?: any;
}