import { FactoryProvider, ModuleMetadata, Type } from '@nestjs/common';

export type AvailableWebhookStrategy = 'discord' | 'slack';
export type AvailableMailService = 'gmail';

export type MailTransportConfig = {
  [k in AvailableMailService]: {
    port: number;
    host: string;
    secure: boolean;
    requireTLS?: boolean;
  };
};

/** Type for dynamic module */
interface WebhookType {
  type: 'webhook';
  strategy: AvailableWebhookStrategy;
}

interface MailType {
  type: 'mail';
}

export interface AlertMailOption {
  service: AvailableMailService;
  to: string;
  auth: {
    user: string;
    password: string;
  };
}

export interface AlertWebhookOption {
  webhookURL: string;
}

/** For Root Option */
export interface WebHookForRootOption extends WebhookType {
  option: AlertWebhookOption;
}

export interface MailForRootOption extends MailType {
  option: AlertMailOption;
}

/** For Root Async Option */
export interface WebHookForRootAsyncOption
  extends WebhookType,
    Pick<ModuleMetadata, 'imports'>,
    Pick<FactoryProvider<AlertWebhookOption>, 'inject' | 'useFactory'> {}

export interface MailForRootAsyncOption
  extends MailType,
    Pick<ModuleMetadata, 'imports'>,
    Pick<FactoryProvider<AlertMailOption>, 'inject' | 'useFactory'> {}

export type AlertForRootOption = WebHookForRootOption | MailForRootOption;

export type AlertForRootAsyncOption =
  | WebHookForRootAsyncOption
  | MailForRootAsyncOption;
