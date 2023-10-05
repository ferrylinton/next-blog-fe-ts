import MarkdownIt from 'markdown-it';
import highlightjs from 'markdown-it-highlightjs';

const md = MarkdownIt()
    .use(highlightjs, {
        register: {
            javascript: require('highlight.js/lib/languages/javascript'),
            java: require('highlight.js/lib/languages/java'),
            python: require('highlight.js/lib/languages/python'),
            css: require('highlight.js/lib/languages/css'),
            sql: require('highlight.js/lib/languages/sql'),
            shell: require('highlight.js/lib/languages/shell'),
        }
    });

export const markdownToHtml = (str: string | undefined) : string => {
    if(str){
        return md.render(str)
    }else{
        return 'undefined';
    }
    
}