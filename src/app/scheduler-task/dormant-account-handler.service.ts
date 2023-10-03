import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DateTime } from 'luxon';

@Injectable()
export class DormantAccountHandlerService {
  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_2AM, {
    name: 'Dormant Account Handle Scheduler',
    timeZone: 'Asia/Seoul',
  })
  async dormantAccountHandler() {
    const now = DateTime.fromJSDate(new Date());
    const users = await this.prisma.user.findMany();
    const deleteUserIdList = [];

    try {
      users.forEach((user) => {
        const userLoginDate = DateTime.fromJSDate(user.loginAt);
        const differMonth = now.diff(userLoginDate, 'months').toObject().months;
        if (differMonth >= 12) {
          deleteUserIdList.push(user.id);
        }
      });
      await this.prisma.$transaction([
        this.prisma.user.deleteMany({
          where: {
            id: {
              in: deleteUserIdList,
            },
          },
        }),
      ]);
    } catch (err) {
      console.error(
        'Exception occured while scheduler. Please check scheduler logic',
      );
      console.error((err as Error)?.message);
    }
  }
}
