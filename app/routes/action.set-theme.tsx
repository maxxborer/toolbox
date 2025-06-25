import type { ActionFunctionArgs } from "@remix-run/node";

import { THEME_VARIANTS } from "app/utils/theme";
import { getTheme, themeCookie } from "app/utils/theme.server";

export async function action({ request }: ActionFunctionArgs) {
	const currentTheme = await getTheme(request);
	const formData = await request.formData();
	const newTheme = formData.get("theme") as string | null;

	if (
		newTheme !== THEME_VARIANTS.LIGHT &&
		newTheme !== THEME_VARIANTS.DARK
	) {
		return Response.json(
			{ success: false, message: "Invalid theme value" },
			{ status: 400 },
		);
	}

	if (newTheme === currentTheme) {
		return Response.json({ success: true, message: "Theme is already set" });
	}

	return Response.json(
		{ success: true },
		{ headers: { "Set-Cookie": await themeCookie.serialize(newTheme) } },
	);
}
