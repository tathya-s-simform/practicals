
import { MAX_MARKS } from "../constants/constants";
import { errorType, StudentDetails } from "../types/types";

export function validateDetails(details: StudentDetails) {
    const error: errorType = {};
    const fields = Object.keys(details).filter(
      (key) => key !== "name"
    ) as (keyof Pick<StudentDetails, "physics" | "chemistry" | "maths">)[];
    if (!details.name.trim()) {
      error.name = "Please enter valid name";
    }
    fields.forEach((field) => {
      if (!details[field].trim()) {
        error[field] = "Please enter valid Number";
      } else if (isNaN(Number(details[field]))) {
        error[field] = "Please enter valid Number";
      } else if (Number(details[field]) > 100 || Number(details[field]) < 0) {
        error[field] = `Please enter value between 0 and ${MAX_MARKS}`;
      }
    });
    return error;
  }