import { PrismaService } from '@app/prisma/prisma.service';
import { AssistantFormService } from './form.service';
import {
  CreateNewFormDto,
  generateRandomAssistant,
  updateFormDto,
} from 'test/payload.test';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '@app/prisma/prisma.module';
import { AwsS3Module } from '@s3/aws-s3';
import { Assistant } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';
import { FormFilterType, PaginateOption } from '@infrastructure/paginator';

describe('AssistantFormService', () => {
  let service: AssistantFormService;
  let prisma: PrismaService;
  let form1;
  let form2;

  const [assistant1Singup] = generateRandomAssistant(true);
  let assistant1: Assistant;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, AwsS3Module],
      providers: [AssistantFormService],
    }).compile();
    service = module.get<AssistantFormService>(AssistantFormService);
    prisma = module.get<PrismaService>(PrismaService);

    await prisma.deleteAll();

    // Create assistant1
    assistant1 = await prisma.assistant.create({
      data: {
        ...assistant1Singup,
      },
    });
  });

  describe('Create Form (POST)', () => {
    it('should create new form', async () => {
      form1 = await service.createForm(assistant1.id, CreateNewFormDto);
      expect(form1).not.toBeUndefined();
      expect(form1.assistantId).toBe(assistant1.id);
    });

    it('should create form too', async () => {
      form2 = await service.createForm(assistant1.id, CreateNewFormDto);
      expect(form2).not.toBeUndefined();
      expect(form2.assistantId).toBe(assistant1.id);
    });
  });

  describe('Get Form by ID (GET)', () => {
    it('should get form with id', async () => {
      const result = await service.getForm(assistant1.id, form1.id);
      expect(result.id).toBe(form1.id);
    });

    it('should throw if invalid user ID', async () => {
      try {
        await service.getForm(1000, form1.id);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw if invalid form ID', async () => {
      try {
        await service.getForm(assistant1.id, 10000);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('Update form', () => {
    it('should update form', async () => {
      form1 = await service.updateForm(assistant1.id, form1.id, updateFormDto);
      expect(form1.title).toBe(updateFormDto.title);
    });
  });

  describe('Delete form', () => {
    it('should archive form', async () => {
      const result = await service.deleteForm(assistant1.id, form1.id);
      expect(result.id).toBe(form1.id);
    });
  });

  describe("It should check if it's successfully archived", () => {
    it('should return only 1 forms', async () => {
      const result = await service.listForm(
        assistant1.id,
        {} as PaginateOption,
        {
          Where: {},
          Orderby: {},
        } as FormFilterType,
      );
      expect(result.aggregate.all).toBe(1);
    });
  });
});
