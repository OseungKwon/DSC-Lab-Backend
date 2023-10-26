// Standard Packages
import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

// Third-party Packages

// Custom Packages

export interface MailModuleOption {
  gmailID: string;
  gmailPW: string;
}

export interface AsyncMailModuleOption
  extends Pick<ModuleMetadata, 'imports'>,
    Pick<FactoryProvider<MailModuleOption>, 'inject' | 'useFactory'> {}

export interface SendOption {
  to: string;
  subject: string;
  content: string;
}
