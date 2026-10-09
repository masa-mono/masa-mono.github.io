export type Locale = 'ja' | 'en';
export type ContentKind = 'pages' | 'insights';

export interface LocalizedEntry {
  id: string;
  data: {
    locale: Locale;
    translationKey: string;
    slug: string;
    title: string;
    description: string;
    draft: boolean;
    updatedAt: Date;
  };
}

export interface TranslationPair<T extends LocalizedEntry> {
  ja: T;
  en: T;
}

export function publishedPairs<T extends LocalizedEntry>(entries: T[], kind: ContentKind): TranslationPair<T>[] {
  const byKey = new Map<string, Partial<TranslationPair<T>>>();
  const routes = new Set<string>();

  for (const entry of entries) {
    const { locale, translationKey } = entry.data;
    if (kind === 'pages' && (translationKey === 'home') !== (entry.data.slug === 'home')) {
      throw new Error('pages: home translationKey and slug must be used together');
    }
    const pair = byKey.get(translationKey) ?? {};
    if (pair[locale]) {
      throw new Error(`${kind}: duplicate ${locale} translation for ${translationKey}`);
    }
    pair[locale] = entry;
    byKey.set(translationKey, pair);

    const route = contentHref(kind, entry);
    if (routes.has(route)) {
      throw new Error(`${kind}: duplicate route ${route}`);
    }
    routes.add(route);
  }

  const published: TranslationPair<T>[] = [];
  for (const [key, pair] of byKey) {
    if (![pair.ja, pair.en].some((entry) => entry && !entry.data.draft)) continue;
    if (!pair.ja || !pair.en || pair.ja.data.draft || pair.en.data.draft) {
      throw new Error(`${kind}: published content ${key} requires published ja and en translations`);
    }
    published.push(pair as TranslationPair<T>);
  }
  return published;
}

export function contentHref(kind: ContentKind, entry: LocalizedEntry): string {
  const { locale, slug } = entry.data;
  if (kind === 'pages' && slug === 'home') return `/${locale}/`;
  return `/${locale}/${kind === 'insights' ? 'insights/' : ''}${slug}/`;
}

export function alternateHrefs<T extends LocalizedEntry>(kind: ContentKind, pair: TranslationPair<T>) {
  return { ja: contentHref(kind, pair.ja), en: contentHref(kind, pair.en) };
}
