import { DynamicModule, Global, Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import {
  AlertForRootAsyncOption,
  AlertForRootOption,
  AvailableWebhookStrategy,
} from './strategy/type';
import { ALERT_OPTION } from './strategy/alert.token';
import { SlackStrategyService } from './strategy/slack.strategy';
import { DiscordStrategyService } from './strategy/discord.strategy';
import { EmailStrategyService } from './strategy/email.strategy';

@Global()
@Module({})
export class AlertModule {
  /** Alert Startegy Injection Token Mapper */
  private static tokenMapper: { [k in AvailableWebhookStrategy] } = {
    slack: SlackStrategyService,
    discord: DiscordStrategyService,
  };

  /** Synchronous For Root Option */
  public static forRoot(option: AlertForRootOption): DynamicModule {
    return {
      imports: [],
      module: AlertModule,
      providers: [
        {
          provide: ALERT_OPTION,
          useValue: option.option,
        },
        {
          provide: AlertService,
          useClass:
            option.type === 'mail'
              ? EmailStrategyService
              : AlertModule.tokenMapper[option.strategy],
        },
      ],
      exports: [AlertService],
    };
  }

  public static forRootAsync(option: AlertForRootAsyncOption): DynamicModule {
    return {
      imports: option.imports,
      module: AlertModule,
      providers: [
        {
          provide: ALERT_OPTION,
          useFactory: option.useFactory,
          inject: option.inject,
        },
        {
          provide: AlertService,
          useClass:
            option.type === 'mail'
              ? EmailStrategyService
              : AlertModule.tokenMapper[option.strategy],
        },
      ],
      exports: [AlertService],
    };
  }
}
