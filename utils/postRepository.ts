import {getAllLocalePostUrlNames, getLocalisedPostPath, getPostLocales} from "./postUtils";
import path from "path";
import {getAppUrl} from "./urlUtils";

export interface IPostInfo {
    storagePath: string,
    url: string,
    allLocales: string[],
}

export function getPostsInfo(postLocale: string, allLocales: string[]): IPostInfo[] {
    const allLocalePostNames = getAllLocalePostUrlNames(postLocale);
    const localeFolderPath = getLocalisedPostPath(postLocale);

    return allLocalePostNames.map((postName) => {
        return {
            storagePath: path.join(localeFolderPath, postName),
            url: getAppUrl(postName, postLocale),
            allLocales: getPostLocales(postName, allLocales)
        } as IPostInfo
    });
}