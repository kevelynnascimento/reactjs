import { api } from "../Api";
import CompanyCreateRequest from "./dtos/requests/CompanyCreateRequest";
import CompanyUpdateRequest from "./dtos/requests/CompanyUpdateRequest";
import CompanyFilterResponse from "./dtos/responses/CompanyFilterResponse";
import CompanyFindResponse from "./dtos/responses/CompanyFindResponse";

export default class CompaniesService {
  private static path: string = 'companies';

  public static async filter(): Promise<CompanyFilterResponse[]> {
    const { data } = await api.get<CompanyFilterResponse[]>(this.path);
    return data;
  }

  public static async create(request: CompanyCreateRequest): Promise<void> {
    await api.post(this.path, request);
  }

  public static async update(id: string, request: CompanyUpdateRequest): Promise<void> {
    await api.put(`${this.path}/${id}`, request);
  }

  public static async disable(id: string): Promise<void> {
    await api.put(`${this.path}/disabling/${id}`);
  }

  public static async findById(id: string): Promise<CompanyFindResponse> {
    const { data } = await api.get<CompanyFindResponse>(`${this.path}/${id}`);
    return data;
  }
}