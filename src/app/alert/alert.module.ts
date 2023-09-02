import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { AlertService } from './alert.service';
import {
  AlertForRootConfigOptions,
  AlertForRootOption,
  AvailableStrategy,
} from '@infrastructure/types/type';
import { ALERT_TOKEN } from './strategy/alert.token';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AlertStrategy } from './strategy/alert.strategy.interface';
import { SlackStrategyService } from './strategy/slack.strategy';
import { DiscordStrategyService } from './strategy/discord.strategy';
import { WebHookURLLost } from '@infrastructure/exception/alert';

@Module({})
export class AlertModule {
  /** Alert Startegy Injection Token Mapper */
  private static tokenMapper: { [k in AvailableStrategy] } = {
    slack: SlackStrategyService,
    discord: DiscordStrategyService,
  };

  /** Synchronous For Root Option */
  public static forRoot(option: AlertForRootOption): DynamicModule {
    // If option is not set as Array Type, Convert to Array Type

    return {
      module: AlertModule,
      providers: [
        {
          provide: ALERT_TOKEN,
          useValue: option.webhookURL,
        },
        {
          provide: AlertService,
          useClass: AlertModule.tokenMapper[option.strategy],
        },
      ],
      exports: [AlertService],
    };
  }

  public static forRootConfig(
    option: AlertForRootConfigOptions,
  ): DynamicModule {
    return {
      imports: [ConfigModule],
      module: AlertModule,
      providers: [
        {
          provide: AlertService,
          useFactory: (cfg: ConfigService) => {
            console.log(process.env);
            return new AlertModule.tokenMapper[option.strategy](
              cfg.get(option.configKey),
            );
          },
          inject: [ConfigService],
        },
      ],
    };
  }
}
