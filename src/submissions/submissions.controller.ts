import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Res,
} from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { Response } from 'express';

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  create(
    @Body() createSubmissionDto: CreateSubmissionDto,
    @Headers() headers,
    @Res() res: Response,
  ) {
    const { authorization } = headers;
    const [, token] = authorization.split(' ');
    return this.submissionsService.create(createSubmissionDto, token, res);
  }

  @Get()
  findAll(@Headers() headers, @Res() res: Response) {
    const { authorization } = headers;
    const [, token] = authorization.split(' ');
    return this.submissionsService.findAll(token, res);
  }
}
