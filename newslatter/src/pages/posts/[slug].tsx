import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { getPrismicCLiet } from "../../services/prismic"
import { RichText } from 'prismic-dom'
import Head from "next/head"

import styles from './post.module.scss';

interface PostProps {
    post: {
        slug: string;
        title: string;
        content: string;
        update: string;
    }
}

export default function Post({ post }: PostProps) {
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
                        className={styles.postContent}
                        dangerouslySetInnerHTML={{ __html: post.content }}>
                    </div>
                </article>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const session = await getSession({ req })
    const { slug } = params;

    if (!session?.activeSubscription) {
        return {
            redirect: {
                destination: `/posts/preview/${slug}`,
                permanent: false,
            }
        }
    }


    const prismic = getPrismicCLiet(req)

    const response = await prismic.getByUID('postId', String(slug), {})

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        update: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })

    }
    return {
        props: {
            post,
        }

    }

}