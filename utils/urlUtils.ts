export function getAppUrl(urlSubPath: string, locale?: string): string {
    return locale
      ? `${process.env.NEXT_PUBLIC_HOST}/${locale}${urlSubPath}`
      : `${process.env.NEXT_PUBLIC_HOST}${urlSubPath}`;
}