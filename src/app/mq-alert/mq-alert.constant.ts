import * as amqp from 'amqplib';

/**
 *
 * amqp heartbeat rate : https://amqp-node.github.io/amqplib/channel_api.html
 *
 * about amqp heartbeat : https://amqp-node.github.io/amqplib/channel_api.html#heartbeating
 */
const amqpHeartbeatRate = 2;

export enum MQALERT {
  MQ1_CONNECTION = 'MQ1_CONNECTION',
}

export const amqpConnectionBuilderFactory = async (
  rmqConnectionURL: string,
) => {
  const connection = await amqp.connect(rmqConnectionURL, {
    heartbeat: amqpHeartbeatRate,
  });
  return connection;
};
