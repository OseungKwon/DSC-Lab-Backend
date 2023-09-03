import { DynamicModule, Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import {
  AlertForRootConfigOptions,
  AlertForRootOption,
  AvailableWebhookStrategy,
} from './strategy/type';
import {
  ALERT_TOKEN,
  EMAIL_PASSWORD_TOKEN,
  EMAIL_SERVICE_TOKEN,
  EMAIL_TO_TOKEN,
  EMAIL_USER_TOKEN,
} from './strategy/alert.token';
import { SlackStrategyService } from './strategy/slack.strategy';
import { DiscordStrategyService } from './strategy/discord.strategy';
import { EmailStrategyService } from './strategy/email.strategy';

@Module({})
export class AlertModule {
  /** Alert Startegy Injection Token Mapper */
  private static tokenMapper: { [k in AvailableWebhookStrategy] } = {
    slack: SlackStrategyService,
    discord: DiscordStrategyService,
  };

  /** Synchronous For Root Option */
  public static forRoot(option: AlertForRootOption): DynamicModule {
    // If option is not set as Array Type, Convert to Array Type
    switch (option.type) {
      case 'webhook':
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
      case 'mail':
        return {
          module: AlertModule,
          providers: [
            {
              provide: EMAIL_TO_TOKEN,
              useValue: option.to,
            },
            {
              provide: EMAIL_SERVICE_TOKEN,
              useValue: option.service,
            },
            {
              provide: EMAIL_USER_TOKEN,
              useValue: option.auth.user,
            },
            {
              provide: EMAIL_PASSWORD_TOKEN,
              useValue: option.auth.password,
            },
            {
              provide: AlertService,
              useClass: EmailStrategyService,
            },
          ],
          exports: [AlertService],
        };
    }
  }

  public static forRootConfig(
    option: AlertForRootConfigOptions,
  ): DynamicModule {
    switch (option.type) {
      case 'webhook':
        return {
          module: AlertModule,
          providers: [
            {
              provide: ALERT_TOKEN,
              useValue: process.env[option.webhookURLConfigKey],
            },
            {
              provide: AlertService,
              useClass: AlertModule.tokenMapper[option.strategy],
            },
          ],
          exports: [AlertService],
        };
      case 'mail':
        return {
          module: AlertModule,
          providers: [
            {
              provide: EMAIL_TO_TOKEN,
              useValue: process.env[option.toConfigKey],
            },
            {
              provide: EMAIL_SERVICE_TOKEN,
              useValue: option.service,
            },
            {
              provide: EMAIL_USER_TOKEN,
              useValue: process.env[option.auth.userConfigKey],
            },
            {
              provide: EMAIL_PASSWORD_TOKEN,
              useValue: process.env[option.auth.passwordConfigKey],
            },
            {
              provide: AlertService,
              useClass: EmailStrategyService,
            },
          ],
          exports: [AlertService],
        };
    }
  }
}
