
# Script used to initialize githooked where scripts and tasks are not readily utilized.
echo "Installing githooked to the project."
if ! [[ -d "./.git-hooks/_util/" ]]; then
  curl -s https://api.github.com/repos/amethyst-studio/githooked/releases/latest \
  | grep "githooked_linux" \
  | cut -d : -f 2,3 \
  | tr -d \" \
  | wget -qi -

  chmod +x githooked_linux
  ./githooked_linux
  rm -rf ./githooked_linux
fi

echo "Done! Githooked has been initialized in this project."
