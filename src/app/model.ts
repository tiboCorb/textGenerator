export interface Post {
    name: string;
    id?: number;
    description: string;
    status: string;
    draft: boolean;
    categoryId: string;
    postedBy: string;
    textLink?: string;
}
