import MarkdownIt from 'markdown-it';
import highlightjs from 'markdown-it-highlightjs';

const md = MarkdownIt()
    .use(highlightjs, {
        register: {
            cypher: require('highlightjs-cypher')
        }
    });

export const markdownToHtml = (str: string | undefined) : string => {
    if(str){
        return md.render(str)
    }else{
        return 'undefined';
    }
    
}