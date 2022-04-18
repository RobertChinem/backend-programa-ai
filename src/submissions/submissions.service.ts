import { Submission, SubmissionDocument } from './entities/submission.entity';
import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { Response } from 'express';
import { verify } from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from 'src/courses/entities/course.entity';

interface IPayload {
  email: string;
}

interface Quiz {
  correctAlternative: number;
}

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectModel(Submission.name)
    private submissionModel: Model<SubmissionDocument>,
    @InjectModel(Course.name)
    private courseModel: Model<CourseDocument>,
  ) {}

  async create(
    { courseId, taskId, answer }: CreateSubmissionDto,
    token: string,
    res: Response,
  ) {
    try {
      const { email } = verify(token, process.env.SECRET_KEY) as IPayload;
      const course = await this.courseModel.findById(courseId);
      const task = course.tasks[taskId];
      let result = false;

      switch (task.type) {
        case 'codeExercise':
          result = this.evaluateCodeExercise(answer);
          break;
        case 'quiz':
          result =
            answer !== undefined &&
            (task as Quiz).correctAlternative === Number(answer);
          break;
        case 'text':
          result = true;
          break;
      }

      const submission = new this.submissionModel({
        userId: email,
        courseId,
        taskId,
        answer,
        result,
      });

      await submission.save();
      res.status(HttpStatus.CREATED).json({ result });
    } catch {
      res.status(HttpStatus.UNAUTHORIZED).json({
        status: 'error',
        message: 'Invalid token',
      });
    }
  }

  async findAll(token: string, res: Response) {
    try {
      const { email } = verify(token, process.env.SECRET_KEY) as IPayload;
      const submissions = await this.submissionModel.find({ userId: email });
      res.json(submissions);
    } catch {
      res.status(HttpStatus.UNAUTHORIZED).json({
        status: 'error',
        message: 'Invalid token',
      });
    }
  }

  private evaluateCodeExercise(code: string): boolean {
    return true;
  }
}
