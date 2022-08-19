
TEMP_DIR="UPDATE_STATE_LOCK_X1"

echo "Updating using '${TEMP_DIR}' as relative storage."
echo "Cloning the 'meta' template to the relative storage."
rm -rf "./${TEMP_DIR}"
git clone https://github.com/amethyst-studio/meta "${TEMP_DIR}"

echo "Installing githooked if needed."
bash META_INIT.sh

echo "Pulling the files which will be updated."
cp -r "./${TEMP_DIR}/META_INIT.sh" "./META_INIT.sh"
cp -r "./${TEMP_DIR}/META_UPDATE.sh" "./META_UPDATE.sh"
cp -r "./${TEMP_DIR}/.editorconfig" "./.editorconfig"
cp -r "./${TEMP_DIR}/.gitattributes" "./.gitattributes"
cp -r "./${TEMP_DIR}/.git-hooks/prepare-commit-msg" "./.git-hooks/prepare-commit-msg"

if ! [[ "$PWD" =~ ".github" ]]; then
  cp -r "./${TEMP_DIR}/.github" "./"
  if ! [[ "$PWD" =~ "meta" ]]; then
    sed -i "s/random/$RANDOM-$RANDOM-$RANDOM-$RANDOM/g" .github/settings.yml
    sed -i "s/vr-stage: .*//g" .github/settings.yml
  else
    sed -i "s/vr-stage: .*/vr-stage: $RANDOM-$RANDOM-$RANDOM-$RANDOM/g" .github/settings.yml
  fi
fi

# Remove the UPDATE_STATE_LOCK_X1 dir.
rm -rf "./${TEMP_DIR}/"
rm -rf githooked_linux

# Commit the changes.
echo "Commiting files to the selected branch."
git reset
git add META_INIT.sh
git add META_UPDATE.sh
git add .github
git add .editorconfig
git add .gitattributes
git add ./.git-hooks/prepare-commit-msg
git commit -m "chore(meta): update cross-organization state"

# Notice.
echo "Done! Please create a pull request or push to release. These files do not change production."
