export default interface AuthContextModel {
    signed: boolean;
    user: object | null;
    login(user: object): Promise<void>;
    logout(): void;
    loading: boolean;
}