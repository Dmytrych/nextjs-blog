import fs from "fs";
import matter from "gray-matter";

export function getPostTitle(postFilePath: string): string {
    const source = fs.readFileSync(postFilePath);

    const { data } = matter(source);

    return data["title"];
}