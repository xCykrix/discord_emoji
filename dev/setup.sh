# DevOps: githooked - https://xcykrix.github.io/githooked.html#githooked-installation-and-help
curl -s https://api.github.com/repos/xCykrix/githooked/releases/latest \
| grep "browser_download_url.*" \
| cut -d : -f 2,3 \
| tr -d \" \
| wget -qi - -O githooked.prod
chmod +x githooked.prod
./githooked.prod install
rm ./githooked.prod

# Dependency: deno - https://deno.land/
sudo snap install deno && sudo snap refresh deno

# Initialize: deno
deno run --no-check=remote --allow-net='cdn.deno.land,api.deno.land,x.nest.land,raw.githubusercontent.com,github.com,api.github.com' --allow-read='deps.ts' --allow-write='deps.ts' https://deno.land/x/dmm/mod.ts update
deno cache --no-check=remote --reload ./deps.ts