import UserPayloadLoginReponse from "./UserPayloadLoginReponse";

export default interface UserLoginReponse {
    user: UserPayloadLoginReponse;
    token: string;
}
