import assert from 'node:assert/strict';
import test from 'node:test';
import { alternateHrefs, publishedPairs, type Locale, type LocalizedEntry } from '../src/lib/localized-content.ts';

function entry(locale: Locale, key: string, slug: string, draft = false): LocalizedEntry {
  return {
    id: `${locale}/${key}`,
    data: { locale, translationKey: key, slug, title: key, description: key, draft, updatedAt: new Date('2026-10-09') },
  };
}

test('published translations resolve to their corresponding URLs', () => {
  const pairs = publishedPairs([
    entry('ja', 'home', 'home'), entry('en', 'home', 'home'),
    entry('ja', 'about', 'about'), entry('en', 'about', 'profile'),
  ], 'pages');
  assert.equal(pairs.length, 2);
  assert.deepEqual(alternateHrefs('pages', pairs[1]), { ja: '/ja/about/', en: '/en/profile/' });
  assert.deepEqual(alternateHrefs('pages', pairs[0]), { ja: '/ja/', en: '/en/' });
});

test('a published translation without a published counterpart stops the build', () => {
  assert.throws(() => publishedPairs([entry('ja', 'about', 'about')], 'pages'), /requires published ja and en/);
  assert.throws(() => publishedPairs([
    entry('ja', 'about', 'about'), entry('en', 'about', 'about', true),
  ], 'pages'), /requires published ja and en/);
});

test('draft-only content is excluded, including an incomplete draft pair', () => {
  const pairs = publishedPairs([
    entry('ja', 'hidden', 'hidden', true),
    entry('ja', 'later', 'later', true), entry('en', 'later', 'later', true),
  ], 'insights');
  assert.deepEqual(pairs, []);
});

test('duplicate translations and public routes are rejected', () => {
  assert.throws(() => publishedPairs([
    entry('ja', 'one', 'one'), entry('ja', 'one', 'other'),
  ], 'pages'), /duplicate ja translation/);
  assert.throws(() => publishedPairs([
    entry('ja', 'one', 'same'), entry('en', 'one', 'one'),
    entry('ja', 'two', 'same'), entry('en', 'two', 'two'),
  ], 'pages'), /duplicate route/);
});

test('only the home translation may use the home route', () => {
  assert.throws(() => publishedPairs([entry('ja', 'about', 'home')], 'pages'), /must be used together/);
  assert.throws(() => publishedPairs([entry('ja', 'home', 'about')], 'pages'), /must be used together/);
});
