import { assertEquals } from './deps.ts';
import * as dismoji from './mod.ts';

/**
 * ID: Function.
 * Description: Test to validate the function the main application code.
 * Scope: mod.ts
 */
Deno.test('Function', async (t) => {
  await t.step('validate', () => {
    assertEquals(dismoji.people.grinning, '😀');
    assertEquals(dismoji.nature.dog, '🐶');
    assertEquals(dismoji.food.hamburger, '🍔');
    assertEquals(dismoji.activity.basketball, '🏀');
    assertEquals(dismoji.travel.airplane, '✈️');
    assertEquals(dismoji.objects.watch, '⌚');
    assertEquals(dismoji.symbols.eight_pointed_black_star, '✴️');
    assertEquals(dismoji.flags.flag_us, '🇺🇸');
  });
});
