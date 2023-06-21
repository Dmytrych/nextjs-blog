import {IPostInfo} from "../utils/postRepository";
import Link from "next/link";
import React from "react";

type PostSuggestionsInput = {
    postsInfo: IPostInfo[]
}

export const PostSuggestions = ({ postsInfo }: PostSuggestionsInput): JSX.Element => {
    return (<div>
        <div className="mb-2">More articles:</div>
        {postsInfo.map((post, index) => <div key={index} className="mb-2">
            <Link href={post.url}>{post.title}</Link>
        </div>)}
    </div>)
}