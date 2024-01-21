import MarkdownIt from 'markdown-it';
import highlightjs from 'markdown-it-highlightjs';
import markdownItContainer from 'markdown-it-container';

const md = MarkdownIt()
    .use(markdownItContainer, 'github')
    .use(markdownItContainer, 'post-navigation')
    .use(highlightjs);

const prefixPath = `${process.env.NEXT_PUBLIC_API_HOST}/api/images/view/`;

export const markdownToHtml = (str: string | undefined, locale?: string | undefined) => {
    if (str) {
        if(locale && locale === 'en'){
            str = str.replaceAll('/post/', '/en/post/')
        }

        return md.render(replaceImageUrl(str));
    } else {
        return 'undefined';
    }
}

export const replaceImageUrl = (content: string) => {
    const regex = /\]\((.+)(?=(\.(svg|gif|png|jpe?g)))/g;

    return content.replace(regex, (_fullResult, imagePath) => {
        if (imagePath.startsWith(prefixPath)) {
            return `](${imagePath}`;
        } else {
            const newImagePath = `${prefixPath}${imagePath}`;
            return `](${newImagePath}`;
        }
    })
}