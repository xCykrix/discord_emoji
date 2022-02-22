// trunk-ignore-all(eslint/@typescript-eslint/require-await): This rule is not needed in the testing suite.

// Pull the testing suite dependencies.
import { expect } from 'chai';
import { relative } from 'path';
import * as dismoji from './index';

// Initialize the test state.
const location = `./${relative(process.cwd(), __filename.replace('.test', ''))}`;

// Test 1: Validate integrity of the _snapshot.json exported information.
describe(`Side-by-side ${location}`, function () {
  it('should parse activity', async function () {
    expect(dismoji.activity.soccer).to.equal('⚽');
  });

  it('should parse flags', async function () {
    expect(dismoji.flags.flag_white).to.equal('🏳️');
  });

  it('should parse food', async function () {
    expect(dismoji.food.green_apple).to.equal('🍏');
  });

  it('should parse nature', async function () {
    expect(dismoji.nature.dog).to.equal('🐶');
  });

  it('should parse objects', async function () {
    expect(dismoji.objects.watch).to.equal('⌚');
  });

  it('should parse people', async function () {
    expect(dismoji.people.grinning).to.equal('😀');
  });

  it('should parse symbols', async function () {
    expect(dismoji.symbols['100']).to.equal('💯');
  });

  it('should parse travel', async function () {
    expect(dismoji.travel.red_car).to.equal('🚗');
  });
});
