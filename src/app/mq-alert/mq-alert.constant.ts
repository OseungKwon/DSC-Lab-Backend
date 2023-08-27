import * as amqp from 'amqplib';

/**
 *
 * amqp heartbeat rate : https://amqp-node.github.io/amqplib/channel_api.html
 *
 * about amqp heartbeat : https://amqp-node.github.io/amqplib/channel_api.html#heartbeating
 */
const amqpHeartbeatRate = 2;
export const ERR_MSG_EXG = 'error_message_exchange';
export const ERR_MSG_TPC = 'error_message';

export enum MQALERT {
  MQ1_CONNECTION = 'MQ1_CONNECTION',
}
