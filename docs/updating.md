# Updating

- Changes are first applied to `dev` branch of
  [Galaxy](https://github.com/emrahcom/galaxy)

- Find the last commit in [Galaxy](https://github.com/emrahcom/galaxy)
  transfered to `dev` branch of `galaxy-kc`. Do this before merging.

- Find all changed files since this commit in
  [Galaxy](https://github.com/emrahcom/galaxy):

  ```bash
  git diff --name-only <COMMIT-SHA>
  ```

- Syncronize changed files with `galaxy-kc`'s `dev` branch. For files which are
  not customized for `galaxy-kc`, just copy them.

- Check the differed files and differences at the end:

  ```bash
  cd ~/git-repo/galaxy-kc/machines/eb-app-api/home/api
  diff -qr ~/git-repo/galaxy/machines/eb-app-api/home/api/galaxy galaxy
  diff -ur ~/git-repo/galaxy/machines/eb-app-api/home/api/galaxy galaxy | less

  cd ~/git-repo/galaxy-kc/machines/eb-app-ui/home/ui/galaxy-dev/src
  diff -qr ~/git-repo/galaxy/machines/eb-app-ui/home/ui/galaxy-dev/src .
  diff -ur ~/git-repo/galaxy/machines/eb-app-ui/home/ui/galaxy-dev/src . | less

  diff -qr ~/git-repo/galaxy/machines/eb-app-api \
    ~/git-repo/galaxy-kc/machines/eb-app-api
  diff -ur ~/git-repo/galaxy/machines/eb-app-api \
    ~/git-repo/galaxy-kc/machines/eb-app-api | less

  diff -qr ~/git-repo/galaxy/machines/eb-app-ui \
    ~/git-repo/galaxy-kc/machines/eb-app-ui
  diff -ur ~/git-repo/galaxy/machines/eb-app-ui \
    ~/git-repo/galaxy-kc/machines/eb-app-ui | less
  ```

- Regenerating deno.lock

  ```bash
  cd ~/git-repo/galaxy-kc/machines/eb-app-api/home/api/galaxy
  rm -rf ~/.cache/deno
  rm -rf deno.lock node_modules
  deno check *.ts
  deno install
  ```

- Check `eb-app-api`

  ```bash
  cd ~/git-repo/galaxy-kc/machines/eb-app-api/home/api/galaxy
  deno fmt --check
  deno lint
  deno check *.ts
  ```

- Check `eb-app-ui`

  ```bash
  cd ~/git-repo/galaxy-kc/machines/eb-app-ui/home/ui/galaxy-dev
  yarn run check
  yarn run lint
  ```

- Install a test system using `dev` branch of
  [Galaxy](https://github.com/emrahcom/galaxy) and test it. If they are passed
  all the tests, they will be merged into `main` branch.

- Install a test system using `dev` branch of `galaxy-kc` and test it

- Merge changes to `main` branch

- Check the result of GitHub actions

- Run a system using `docker-compose` and test it

- Switch back to `dev` branch in the local repo for future updates
