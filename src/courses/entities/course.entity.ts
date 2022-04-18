import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

class Task {
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

@Schema()
export class Course {
  @Prop()
  title: string;

  @Prop()
  tasks: Task[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
