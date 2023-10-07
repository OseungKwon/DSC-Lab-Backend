import { DynamicModule, Global, Module } from '@nestjs/common';
import { AsyncMailModuleOption, MailModuleOption } from './type';
import { MailService } from './mail.service';
import { MAIL_OPTION } from './mail.token';

@Global()
@Module({})
export class MailModule {
  public static forRoot(option: MailModuleOption): DynamicModule {
    return {
      imports: [],
      module: MailModule,
      providers: [
        {
          provide: MAIL_OPTION,
          useValue: option,
        },
        {
          provide: MailService,
          useClass: MailService,
        },
      ],
      exports: [MailService],
    };
  }

  public static forRootAsync(option: AsyncMailModuleOption): DynamicModule {
    return {
      imports: option.imports || [],
      module: MailModule,
      providers: [
        {
          provide: MAIL_OPTION,
          useFactory: option.useFactory,
          inject: option.inject || [],
        },
        {
          provide: MailService,
          useClass: MailService,
        },
      ],
      exports: [MailService],
    };
  }
}
