import { getInfo } from "@/services/app-service";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
	const clientIp = (req.headers["x-real-ip"] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '') as string;
	const { data } = await getInfo(clientIp, req.headers['user-agent'] || '');
	res.setHeader("Content-Type", "application/json");
	res.write(JSON.stringify(data));
	res.end();

	return {
		props: {}
	}
}

export default function SiteMap() { }