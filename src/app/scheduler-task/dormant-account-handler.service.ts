// Standard Packages
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

// Third-party Packages
import { DateTime } from 'luxon';

// Custom Packages
import { MailService } from '@app/mail/mail.service';
import { PrismaService } from '@app/prisma/prisma.service';
import {
  dormancyAccountDeleteAlertContentBuilder,
  dormancyAlertContentBuilder,
} from './mail';

@Injectable()
export class DormantAccountHandlerService {
  private logger = new Logger(DormantAccountHandlerService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_2AM, {
    name: 'Dormant Account Handle Scheduler',
    timeZone: 'Asia/Seoul',
  })
  async dormantAccountHandler() {
    const now = DateTime.fromJSDate(new Date());
    const users = await this.prisma.user.findMany();
    const deleteUserList = [];

    try {
      users.forEach((user) => {
        const userLoginDate = DateTime.fromJSDate(user.loginAt);
        const diff = now.diff(userLoginDate, ['months', 'days']).toObject();
        const differMonth = diff.months;
        const differDay = diff.days;

        if (differMonth >= 12 && differDay == 0) {
          /** Dormany Delete Alert */
          this.mail.sendMail({
            to: user.email,
            subject: '미활동 계정 삭제 알림',
            content: dormancyAccountDeleteAlertContentBuilder(user.name),
          });
          deleteUserList.push();
        } else {
          /** Dormancy Warning Alert */
          if (differMonth === 10 && differDay === 0) {
            this.mail.sendMail({
              to: user.email,
              subject: '미활동 계정 알림',
              content: dormancyAlertContentBuilder(user.name),
            });
          }
        }
      });
      await this.prisma.$transaction([
        this.prisma.user.deleteMany({
          where: {
            id: {
              in: deleteUserList,
            },
          },
        }),
      ]);
      this.logger.log(
        `Dormant Account Handler Triggered. Total ${deleteUserList.length} dormant accounts deleted.`,
      );
    } catch (err) {
      this.logger.error(
        'Exception occured while scheduler. Please check scheduler logic',
      );
      this.logger.error((err as Error)?.message);
    }
  }
}
