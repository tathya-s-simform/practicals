export type StudentDetails = {
    name: string;
    physics: string;
    chemistry: string;
    maths: string;
  };
  export type ResultType = {
    name: string;
    total: number;
    percentage: number;
    grade: string;
    status: "Pass" | "Fail";
  };
  export type errorType = Partial<StudentDetails>;
  export type fieldType = { field: keyof StudentDetails; placeholder: string }[];
export type ContactType={
 id: string;
 firstName: string;
 lastName: string;
 isFavorite: boolean;
 gender: string;
 phoneNumber:string
}
export type SectionDataType = {
  title: string;
  data: ContactType[];
};