import { GetStaticProps, GetStaticPaths } from "next"
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { RichText } from 'prismic-dom'

import { getPrismicCLiet } from "../../../services/prismic"

import styles from '../post.module.scss';

import { useEffect } from "react";
import { useRouter } from "next/router";
import { Console } from "console";


interface PostPreviewProps {
    post: {
        slug: string;
        title: string;
        content: string;
        update: string;
    }
}

export default function Post({ post }: PostPreviewProps) {
    const { data: session } = useSession();
    const router = useRouter()

    useEffect(() => {
        if (session?.activeSubscription) {
            router.push(`/posts/${post.slug}`)

        }

    }, [session])

   
    return (
        <>
            <Head>
                <title>
                    {post.title} | Newsletter
                </title>

            </Head>
            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.update}</time>
                    <div
                        className={`${styles.postContent} ${styles.previewContent}`}
                        dangerouslySetInnerHTML={{ __html: post.content }}>
                    </div>

                    <div className={styles.continueReading}>
                        wanna continue reading?
                        <Link href="/">
                            <a href="">Subscribe now 🤗</a>
                        </Link>
                    </div>
                </article>
            </main>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }

}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { slug } = params;

    const prismic = getPrismicCLiet()

    console.log("PREVIEW:", slug)
    const response = await prismic.getByUID('postId', String(slug), {})

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0, 3)),
        update: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })

    }
    return {
        props: {
            post,
        }, redirect: 60 * 30 //30 minutos

    }

}