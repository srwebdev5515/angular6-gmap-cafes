import { CafesModule } from './cafes.module';

describe('CafesModule', () => {
  let cafesModule: CafesModule;

  beforeEach(() => {
    cafesModule = new CafesModule();
  });

  it('should create an instance', () => {
    expect(cafesModule).toBeTruthy();
  });
});
