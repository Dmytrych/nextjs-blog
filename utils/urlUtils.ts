export function getAppUrl(urlSubPath: string, locale: string): string {
    return `${process.env.NEXT_PUBLIC_HOST}${locale}${urlSubPath}`;
}