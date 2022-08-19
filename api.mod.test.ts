// deno-lint-ignore-file prefer-ascii
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import * as dismoji from './mod.ts';

/**
 * ID: GENERAL_API.
 * Description: Test to validate the API the main application code.
 * Scope: mod.ts
 */
Deno.test('General API', async (t) => {
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
