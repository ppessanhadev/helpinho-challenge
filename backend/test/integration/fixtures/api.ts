import { IsString } from 'class-validator';
import { Body, Controller, Module, Post } from '@nestjs/common';
import { AuthModule } from '@core';

class DummyPayload {
  @IsString()
  name: string;
}

@Controller('dummy')
class ApiDummyController {
  @Post('validate')
  public async validate(@Body() body: DummyPayload) {
    return { name: body.name };
  }
}

@Module({
  imports: [AuthModule],
  controllers: [ApiDummyController],
})
export class DummyApiModule {}
