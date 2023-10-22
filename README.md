# 🖥️ Hongik University Department of Software and Communication Backoffice API

홍익대학교 소프트웨어 융합학과 신규 사이트 및 백오피스 RESTful API

---

## Technical Stack

---

### Development

- TypeScript
- Nest.js(v.10), Express.js
- Database
  - MySQL: MySQL 8.1
  - ORM: Prisma ORM
- Cache
  - Redis Cluster (1Master, 2Worker)
- System Metrics, APM Monitoring
  - Grafana (Docker on-premise)
  - Prometheus (Docker on-premise)
  - InfluxDB (Docker on-premise)
- Issue Tracking
  - Sentry (It can be change to custom exception tracker)

### Production

- AWS (Including future usage)
  - AWS EC2
  - AWS S3
  - AWS CodeCommit, CodeBuild, CodePipeline
  - AWS SQS, SNS
  - AWS Elastic Cache

## Rules

---

1. Use Interface Driven Development.

2. You need to make E2E test, Unit test.

- Test code require all of the error condition.

3. Need to migrate database after schema changed.

4. Use git-flow while development

5. Run E2E, Unit test before merge.

## Run test code

- E2E test

```
yarn test:e2e
```

- Unit test

```
yarn test:unit
```

## Contribution

---

Contribution are always welcome. Please contact owner of this repository when you want to contribute.(If possible, it would be nice to be a DSC Student)

- Contact: jhoplin7259@gmail.com
