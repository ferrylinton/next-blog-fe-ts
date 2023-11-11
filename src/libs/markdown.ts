import MarkdownIt from 'markdown-it';
import highlightjs from 'markdown-it-highlightjs';

const md = MarkdownIt().use(highlightjs);

export const markdownToHtml = (str: string | undefined) : string => {
    if(str){
        return md.render(replaceImageUrl(str));
    }else{
        return 'undefined';
    }
}

export const replaceImageUrl = (content: string) => {
    const regex = /\]\((.+)(?=(\.(svg|gif|png|jpe?g)))/g;

    return content.replace(regex, (_fullResult, imagePath) => {
        if(imagePath.startsWith(process.env.NEXT_PUBLIC_API_HOST)){
            return imagePath;
        }else{
            const newImagePath = `${process.env.NEXT_PUBLIC_API_HOST}${imagePath}`;
            return `](${newImagePath}`;
        }
    })
}