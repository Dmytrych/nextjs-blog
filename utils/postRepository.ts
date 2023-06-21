import {getAllLocalePostUrlNames, getLocalisedPostPath, getPostLocales} from "./postUtils";
import path from "path";
import {getAppUrl} from "./urlUtils";
import {getPostTitle} from "../processing/postsRepository";

export interface IPostInfo {
    storagePath: string,
    url: string,
    allLocales: string[],
    title: string,
}

export function getPostsInfo(postLocale: string, allLocales: string[], defaultLocale: string): IPostInfo[] {
    const allLocalePostNames = getAllLocalePostUrlNames(postLocale);
    const localeFolderPath = getLocalisedPostPath(postLocale);

    return allLocalePostNames.map((postName) => {
        const fileStoragePath = path.join(localeFolderPath, `${postName}.mdx`);
        return {
            storagePath: fileStoragePath,
            url: defaultLocale === postLocale
              ? getAppUrl(`/posts/${postName}`)
              : getAppUrl(`/posts/${postName}`, postLocale),
            allLocales: getPostLocales(postName, allLocales),
            title: getPostTitle(fileStoragePath)
        } as IPostInfo
    });
}