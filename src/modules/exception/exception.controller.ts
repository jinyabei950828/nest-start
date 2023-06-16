import {
  Body,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Headers,
  Patch,
  Param,
  Delete,
  Controller,
  UseFilters,
  ParseIntPipe
} from '@nestjs/common';
import { ExceptionService } from './exception.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';

@ApiBearerAuth()
@ApiTags('exception')
@UseFilters(new HttpExceptionFilter())
@Controller('/exception')
export class ExceptionController {
  constructor(private readonly exceptionService: ExceptionService) {}

  @Get()
  fetch(@Query() { id }, @Headers('token') token): string {
    if (!id) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: '请求参数id必传',
          error: 'id is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.exceptionService.fetch(id);
  }

  @Post()
  @ApiBody({ description: '填写更新内容' })
  save(@Body() { message, id }): string {
    return this.exceptionService.save(message);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  @ApiBody({ description: '请输入message' })
  //接受的参数通过管道转换
  update(@Param('id', new ParseIntPipe()) id, @Body() { message }): string {
    return this.exceptionService.update(id, message);
  }

  @Delete()
  remove(@Query() { id }): string {
    return this.exceptionService.remove(id);
  }
}
