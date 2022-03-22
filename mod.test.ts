import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import * as dismoji from './mod.ts';

// Define the QA UnitTest for 'people' in the runtime.
Deno.test('people', () => {
  assertEquals(dismoji.people.grinning, '😀');
});

// Define the QA UnitTest for 'nature' in the runtime.
Deno.test('nature', () => {
  assertEquals(dismoji.nature.dog, '🐶');
});

// Define the QA UnitTest for 'food' in the runtime.
Deno.test('food', () => {
  assertEquals(dismoji.food.hamburger, '🍔');
});

// Define the QA UnitTest for 'activity' in the runtime.
Deno.test('activity', () => {
  assertEquals(dismoji.activity.basketball, '🏀');
});

// Define the QA UnitTest for 'travel' in the runtime.
Deno.test('travel', () => {
  assertEquals(dismoji.travel.airplane, '✈️');
});

// Define the QA UnitTest for 'objects' in the runtime.
Deno.test('objects', () => {
  assertEquals(dismoji.objects.watch, '⌚');
});

// Define the QA UnitTest for 'symbols' in the runtime.
Deno.test('symbols', () => {
  assertEquals(dismoji.symbols.eight_pointed_black_star, '✴️');
});

// Define the QA UnitTest for 'flags' in the runtime.
Deno.test('flags', () => {
  assertEquals(dismoji.flags.flag_us, '🇺🇸');
});
