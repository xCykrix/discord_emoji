#!/bin/bash
set -e

# DevOps: githooked - https://xcykrix.github.io/githooked.html#githooked-installation-and-help
curl -s https://api.github.com/repos/xCykrix/githooked/releases/latest |
  grep "browser_download_url.*/githooked/.*/githooked" |
  cut -d : -f 2,3 |
  tr -d \" |
  wget -qi - -O githooked.prod
chmod +x githooked.prod
./githooked.prod install
rm ./githooked.prod
