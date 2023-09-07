export default interface TableActionModel {
    title: string;
    click: (id: string) => void;
    content: JSX.Element;
}