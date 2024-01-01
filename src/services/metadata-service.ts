export const getDescription = (locale: string | undefined) => {
    const id = 'marmeam.com merupakan blog pemrograman sederhana dengan contoh sederhana kode pemrograman, CSS, HTML dan alat pengembangan.'
    const en = 'marmeam.com is a simple programming blog with simple examples of programming code, CSS, HTML and development tools';

    return locale === 'en' ? en : id;
}