import { region } from './region';
// tslint:disable-next-line:import-name
import * as shallowEqual from 'shallowequal';

describe('getProps should be shallow equal', () => {
  test('shallow equal', () => {
    region.set('shallowEqual', {});
    const props = region.getProps('shallowEqual');
    const nextProps = region.getProps('shallowEqual');
    expect(shallowEqual(props, nextProps)).toBe(true);
  });

  test('not shallow equal', () => {
    region.set('shallowEqual', {});
    const props = region.getProps('shallowEqual');
    region.set('shallowEqual', {});
    const nextProps = region.getProps('shallowEqual');
    expect(shallowEqual(props, nextProps)).toBe(false);
  });
});
