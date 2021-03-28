import { Controller } from '@nestjs/common';
import {
  Crud,
  CrudController,
  ParsedRequest,
  CrudRequest,
  ParsedBody,
} from '@nestjsx/crud';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('用户模块')
// @ApiSecurity('bearer')
@Crud({
  model: {
    type: User,
  },
  query: {
    exclude: ['password'],
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
})
@Controller('users')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: User) {
    return this.service.createOne(req, dto);
  }
}
