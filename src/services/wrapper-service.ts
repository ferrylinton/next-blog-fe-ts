import { logger } from '@/configs/winston';
import axios from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getTags } from './tag-service';
import { redirectTo429, redirectTo503 } from '@/libs/redirect-util';


export function withCommonData(gssp: GetServerSideProps) {
    return async (context: GetServerSidePropsContext) => {
        logger.info(`[${context.locale}] : ${context.resolvedUrl}`);
        const ssrConfig = await serverSideTranslations(context.locale ?? 'id', ['common']);

        try {
            const gsspData = await gssp(context);
            const props = 'props' in gsspData ? gsspData.props : {};
            const tags = await getTags();

            return {
                props: {
                    tags,
                    ...props,
                    ...ssrConfig
                }
            }
        } catch (error: any) {
            logger.error(error);

            if (axios.isAxiosError(error)) {
                const response = error?.response

                if (response && response.status === 503) {
                    return redirectTo503(context.locale);
                } else if (response && response.status === 429) {
                    return redirectTo429(context.locale);
                }if (response && response.status === 404) {
                    return {
                        props: {
                            ...ssrConfig
                        }
                    }
                }
            }

            return {
                props: {
                    messageError: { message: error.message },
                    ...ssrConfig
                }
            }
        }
    }
}

