import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course, CourseDocument } from './entities/course.entity';
import { Model } from 'mongoose';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  create(createCourseDto: CreateCourseDto) {
    const course = new this.courseModel(createCourseDto);
    return course.save();
  }

  findAll() {
    return this.courseModel.find();
  }

  findOne(id: string) {
    return this.courseModel.findById(id);
  }

  update(id: string, updateCourseDto: UpdateCourseDto) {
    return this.courseModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateCourseDto,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.courseModel.deleteOne({ _id: id }).exec();
  }
}
