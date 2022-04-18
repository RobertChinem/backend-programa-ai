export class Task {
  id: number;
  type: 'text' | 'quiz' | 'codeExercise';
  title: string;
  content?: string;
  description?: string;
  alternatives?: string[];
  correctAlternative?: number;
  explanation?: string;
  solutionText?: string;
  solutionCode?: string;
}

export class CreateCourseDto {
  title: string;
  tasks: Task[];
}
