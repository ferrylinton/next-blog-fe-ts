import { logger } from "@/configs/winston";
import { getSitemaps } from "@/services/sitemap-service";
import { Url } from "@/types/sitemap-type";
import { GetServerSidePropsContext } from "next";

function generateSiteMap(urls: Url[]) {

  const sitemapsXml = urls.map(url =>
    `<url>
        <loc>${url.loc}</loc>
        <lastmod>${url.lastmod}</lastmod>
      </url>`)

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapsXml.join('')}
    </urlset>
  `
}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  let sitemaps: Url[] = [];

  try {
    const { data } = await getSitemaps();
    sitemaps = data;
  } catch (error) {
    console.error(error);
    logger.error(error);
  }

  const sitemapsXml = generateSiteMap(sitemaps);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemapsXml);
  res.end();

  return {
    props: {}
  }
}

export default function SiteMap() { }