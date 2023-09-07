import TableDataModel from "../../../../components/Table/models/TableDataModel";

export default interface CompanyFilterResponse extends TableDataModel {
    id: string;
    name: string;
    phoneNumber: string;
}
