import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export type PostMetadata = {
    title: string;
    publishedAt: string;
    updatedAt?: string;
    summary: string;
    image?: string;
    tags: string[];
    category: 'Engineering' | 'Data Engineering' | 'Product Management' |
    'SQL & Databases' | 'PySpark & Big Data' | 'Tech Decoded';
    featured?: boolean;
    status?: 'draft' | 'published';
};

export async function createPost(
    slug: string,
    metadata: PostMetadata,
    content: string
): Promise<void> {
    const fileName = `${slug}.mdx`;
    const filePath = path.join(CONTENT_DIR, fileName);

    const fileContent = matter.stringify(content, metadata);
    await fs.writeFile(filePath, fileContent, 'utf-8');
}

export async function updatePost(
    slug: string,
    metadata: PostMetadata,
    content: string
): Promise<void> {
    // Create backup before updating
    const fileName = `${slug}.mdx`;
    const filePath = path.join(CONTENT_DIR, fileName);

    try {
        const existing = await fs.readFile(filePath, 'utf-8');
        const backupPath = path.join(CONTENT_DIR, `.${slug}.backup.mdx`);
        await fs.writeFile(backupPath, existing, 'utf-8');
    } catch (error) {
        // File doesn't exist yet, that's okay
    }

    const fileContent = matter.stringify(content, metadata);
    await fs.writeFile(filePath, fileContent, 'utf-8');
}

export async function deletePost(slug: string): Promise<void> {
    const fileName = `${slug}.mdx`;
    const filePath = path.join(CONTENT_DIR, fileName);
    await fs.unlink(filePath);
}

export async function getAllPosts(): Promise<Array<{ slug: string; metadata: PostMetadata; content: string }>> {
    const files = await fs.readdir(CONTENT_DIR);
    const mdxFiles = files.filter(file => file.endsWith('.mdx') && !file.startsWith('.'));

    const posts = await Promise.all(
        mdxFiles.map(async (file) => {
            const filePath = path.join(CONTENT_DIR, file);
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const { data, content } = matter(fileContent);

            return {
                slug: file.replace('.mdx', ''),
                metadata: data as PostMetadata,
                content,
            };
        })
    );

    return posts;
}

export async function getPost(slug: string): Promise<{ metadata: PostMetadata; content: string } | null> {
    try {
        const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data, content } = matter(fileContent);

        return {
            metadata: data as PostMetadata,
            content,
        };
    } catch (error) {
        return null;
    }
}

export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

export async function uploadImage(
    postSlug: string,
    file: File
): Promise<string> {
    const imageDir = path.join(process.cwd(), 'public', 'blog', 'images', postSlug);
    await fs.mkdir(imageDir, { recursive: true });

    const fileName = file.name.replace(/[^a-z0-9.-]/gi, '-').toLowerCase();
    const imagePath = path.join(imageDir, fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(imagePath, buffer);

    return `/blog/images/${postSlug}/${fileName}`;
}
