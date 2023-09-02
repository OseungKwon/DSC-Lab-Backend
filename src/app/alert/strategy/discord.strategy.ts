import { Inject, Injectable, Logger } from '@nestjs/common';
import { AlertStrategy } from './alert.strategy.interface';

import { EmbedBuilder, WebhookClient } from 'discord.js';
import { WebHookURLLost } from '@infrastructure/exception/alert';
import { FilteredException } from '@infrastructure/types/type';
import { ALERT_TOKEN } from './alert.token';

@Injectable()
export class DiscordStrategyService implements AlertStrategy {
  private webHookClient: WebhookClient;
  private logger = new Logger('Discord Alert');

  constructor(@Inject(ALERT_TOKEN) private readonly webHookURL: string) {
    console.log(this.webHookURL);
    this.webHookClient = new WebhookClient({
      url: this.webHookURL,
    });
  }

  async send(message: FilteredException): Promise<void> {
    try {
      const embed = await this.getEmbed(message);
      await this.webHookClient.send({ embeds: [embed] });
    } catch (err) {
      this.logger.error(err);
    }
  }

  private async getEmbed(message: FilteredException): Promise<EmbedBuilder> {
    return new EmbedBuilder()
      .setColor(0x77b5fe)
      .setTitle('Hongik Univ. DSC Server Alert')
      .setURL('https://github.com/J-hoplin1/DSC-Lab-Backend')
      .setDescription(
        '홍익대학교 소프트웨어 융합학과 서버 에러 메세지 알림입니다. 관리자에게 이 메세지를 보여주세요',
      )
      .setThumbnail(
        'https://www.hongik.ac.kr/front/images/local/header_logo.png',
      )
      .addFields(
        {
          name: 'Error Endpoint & Status Code',
          value: `${message?.endpoint} (${message?.statusCode})`,
          inline: true,
        },
        {
          name: 'Error Message',
          value: message.message,
          inline: true,
        },
      )
      .setTimestamp()
      .setFooter({
        text: 'Developed by Hoplin',
        iconURL: 'https://avatars.githubusercontent.com/u/45956041?v=4',
      });
  }
}
