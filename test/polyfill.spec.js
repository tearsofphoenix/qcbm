import {expect} from 'chai'
import {argsort, partial} from '../src/polyfill'

describe('polyfill test', () => {
  it('should test argsort', function () {
    const array = [3, 1, 2]
    const result = argsort(array)
    expect(result).to.deep.equal([1, 2, 0])
  });

  it('should test partial', function () {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const result = partial(array, [3, 2, 1])
    expect(result).to.deep.equal([4, 3, 2])
  });
})
