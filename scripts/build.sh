deno cache --no-check=remote ./scripts/build-mod.ts
deno run --allow-net=discord.com --allow-read --allow-run --allow-write=mod.ts,js_temp ./scripts/build-mod.ts
