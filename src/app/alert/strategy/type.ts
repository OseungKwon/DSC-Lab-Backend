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

interface WebhookType {
  type: 'webhook';
  strategy: AvailableWebhookStrategy;
}

interface MailType {
  type: 'mail';
  service: AvailableMailService;
}

export interface MailAlertOption extends MailType {
  to: string;
  auth: {
    user: string;
    password: string;
  };
}

export interface AlertWebhookOption extends WebhookType {
  webhookURL: string;
}

export interface AlertWebhookOptionConfig extends WebhookType {
  webhookURLConfigKey: string;
}

export interface MailAlertOptionConfig extends MailType {
  toConfigKey: string;
  auth: {
    userConfigKey: string;
    passwordConfigKey: string;
  };
}

export type AlertForRootOption = AlertWebhookOption | MailAlertOption;

export type AlertForRootConfigOptions =
  | AlertWebhookOptionConfig
  | MailAlertOptionConfig;
