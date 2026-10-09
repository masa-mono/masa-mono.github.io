import { getCollection, type CollectionEntry } from 'astro:content';
import { publishedPairs } from './localized-content';

export async function getPagePairs() {
  return publishedPairs(await getCollection('pages'), 'pages');
}

export async function getInsightPairs() {
  return publishedPairs(await getCollection('insights'), 'insights');
}

export type PageEntry = CollectionEntry<'pages'>;
export type InsightEntry = CollectionEntry<'insights'>;
