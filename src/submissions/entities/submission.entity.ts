import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubmissionDocument = Submission & Document;

@Schema()
export class Submission {
  @Prop()
  userId: string;

  @Prop()
  courseId: string;

  @Prop()
  taskId: number;

  @Prop()
  answer?: string;

  @Prop()
  result: boolean;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
