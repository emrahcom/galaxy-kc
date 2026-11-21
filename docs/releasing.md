# Releasing

- Release after the changes are merged into `main`. See
  [updating](updating.md).

- The version is the release date in UTC: `vYYYYMMDD`. The workflows tag the
  images with the UTC date of the build, so create the release and run the
  workflows on the same UTC day.

- List the commits since the previous release for the release notes:

  ```bash
  git log --format='- %s' <PREVIOUS-TAG>..main
  ```

- Create the release:

  https://github.com/emrahcom/galaxy-kc/releases/new

  - Tag: `vYYYYMMDD`, created on publish
  - Target: `main`
  - Title: `vYYYYMMDD`
  - Notes: the commit list

- Run the workflows on `main` from the `Actions` page:

  - `galaxy-api-adm`
  - `galaxy-api-pri`
  - `galaxy-api-pub`
  - `galaxy-ui`

  Each one pushes `latest` and `vYYYYMMDD` to
  `ghcr.io/emrahcom/galaxy-kc/<IMAGE>`.

- Check the result of the workflows and the image tags in the packages.

- If a fix is needed after the release, commit it to `main`, move the tag and
  run all workflows again:

  ```bash
  git tag -f vYYYYMMDD <COMMIT-SHA>
  git push -f origin vYYYYMMDD
  ```

- Run a system using `docker-compose` and test it

- Switch back to `dev` branch in the local repo for future updates
