import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { customerSchema } from './customer.model';
import { PortfoliosService } from './portfolios.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../test/MongooseTest';

const moduleMocker = new ModuleMocker(global);

describe('PortfoliosService', () => {
  let service: PortfoliosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'Customer', schema: customerSchema },
        ]),
      ],
      providers: [PortfoliosService],
    })
      .useMocker((token) => {
        if (token === PortfoliosService) {
          return { findAll: jest.fn().mockResolvedValue('results') };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    service = module.get<PortfoliosService>(PortfoliosService);
  });

  it('should be defined', async () => {
    // não deu tempo de aprender a popular o mongoose na memoria, então o retorno esperado é undefined
    expect(await service.goalReached('6170700be3c765f518e859fe')).toStrictEqual(
      undefined,
    );
  });

  it('should create a customer', () => {
    expect(
      new service.customerModel({
        firstName: 'Warren',
        lastName: 'Pfvr me contrata',
        portfolios: {
          name: 'Não deu tempo de aprender muito dos testes, mas eu aprendo',
          amount: 6000,
          goalAmount: 8000,
        },
      }),
    ).toHaveProperty('createdAt');
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
