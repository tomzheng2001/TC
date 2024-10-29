export interface IVideo {
    _id: string;
    title: string;
    url: string;
    creatorId: string;
    description: string;
    tags: string[];
    likes: string[];
    bookmarks: string[];
    likeCount?: number;
    bookmarkCount?: number;
}