import { getInfo } from "@/services/app-service";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
	const { data } = await getInfo(req.headers['user-agent'] || '');
	res.setHeader("Content-Type", "application/json");
	res.write(JSON.stringify(data));
	res.end();

	return {
		props: {}
	}
}

export default function SiteMap() { }