import { api } from "../Api";
import UserLoginRequest from "./dtos/requests/UserLoginRequest";
import UserLoginReponse from "./dtos/responses/UserLoginReponse";

export default class UsersService {
  private static path: string = 'users';

  public static async login(request: UserLoginRequest): Promise<UserLoginReponse> {
    const { data } = await api.post<UserLoginReponse>(`${this.path}/login`, request);
    return data;
  }
}