import { CamelToRegularPipe } from './camel-to-regular.pipe';

describe('CamelToRegularPipe', () => {
  it('create an instance', () => {
    const pipe = new CamelToRegularPipe();
    expect(pipe).toBeTruthy();
  });
});
