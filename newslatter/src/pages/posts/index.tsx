import { GetStaticProps } from "next";
import Head from "next/head";
import { getPrismicCLiet } from "../../services/prismic";
import styles from './styles.module.scss';
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import Link from "next/link";

type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
}

interface PropsPops {
    posts: Post[]
}

export default function Post({ posts }: PropsPops) {
    return (
        <>
            <Head>
                <title>
                    Post | newsletter
                </title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    {posts.map(post => (
                        <Link href={`/posts/${post.slug}`} >
                            <a key={post.slug}>
                                <time>{post.updatedAt}</time>
                                <strong>{post.title}</strong>
                                <p>{post.excerpt}</p>
                            </a>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    )

}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicCLiet()

    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'postId')
    ], {
        fetch: ['postId.title', 'postId.content'],
        pageSize: 100,
    })


   // console.log(JSON.stringify(response, null, 2))
    const posts = response.results.map(post => {
        return {
            slug: post.slugs,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content[0].text,
            //.find(content => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: "numeric",

            })
        };
    }

    );


    return {
        props: {
            posts
        }
    }
}