export const redirectTo503 = (locale: string | undefined) => {
    if (typeof window === 'undefined') {
        return {
            redirect: {
                destination: locale === 'id' ? '/503' : `/${locale}/503`,
                permanent: false
            }
        }
    } else {
        window.location.replace(locale === 'id' ? `/503` : `/${locale}/503`);
    }
}

export const redirectTo429 = (locale: string | undefined) => {
    if (typeof window === 'undefined') {
        return {
            redirect: {
                destination: locale === 'id' ? '/429' : `/${locale}/429`,
                permanent: false
            }
        }
    } else {
        window.location.replace(locale === 'id' ? `/429` : `/${locale}/429`);
    }
}