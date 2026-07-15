
import { MAX_MARKS } from "../constants/constants";
import { ResultType, StudentDetails } from "../types/types";
import { calculateGrade } from "./calculateGrade";

export const calculateResult = (details: StudentDetails): ResultType | null => {
    const { name, physics, chemistry, maths } = details;
    const subjectMarks: string[] = [physics, chemistry, maths];
    const total = subjectMarks.reduce((acc, curr) => {
      acc += Number(curr);
      return acc;
    }, 0);
    const percentage = (total * 100) / (subjectMarks.length * MAX_MARKS);
    const grade = calculateGrade(percentage);
    const status = percentage > 33 ? "Pass" : "Fail";
    return {
      name,
      total,
      percentage,
      grade,
      status,
    };
  }