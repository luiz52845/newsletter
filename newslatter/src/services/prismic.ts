import Prismic from '@prismicio/client'

export function getPrismicCLiet(req?: unknown) {
    const prismic = Prismic.client(
        process.env.PRIMISC_ENDPOINT,
        {
            req,
            accessToken: process.env.PRISMIC_ACCESS_TOKEN
        }
    )

    return prismic;

}