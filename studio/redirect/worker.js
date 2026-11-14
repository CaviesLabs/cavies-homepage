// Sends www.cavies.studio, cavies.xyz and www.cavies.xyz to https://cavies.studio,
// permanently (308), keeping path and query. Deploy with
// `wrangler deploy -c redirect/wrangler.jsonc`.
const redirect = {
  fetch(request) {
    const url = new URL(request.url);
    return new Response(null, {
      status: 308,
      headers: {
        Location: `https://cavies.studio${url.pathname}${url.search}`,
        "Strict-Transport-Security": "max-age=63072000",
      },
    });
  },
};

export default redirect;
