export function calculateGrade(percentage: number) {
    if (percentage >= 85) {
      return "A";
    } else if (percentage >= 60) {
      return "B";
    } else if (percentage >= 45) {
      return "C";
    } else return "D";
  }