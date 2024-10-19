# galaxy-kc

`Galaxy-kc` is a web application for `Jitsi` admins and users to organize their
Jitsi meetings, meeting schedules and attendees.

This version uses `Keycloak` as the identity provider. Check
[Galaxy](https://github.com/emrahcom/galaxy) for version with a built-in
identity management system.

### Try it

Try `Galaxy` using publicly available implementation on
[https://eparto.net](https://eparto.net).

### Features

- Use `Keycloak` as the identity management system
- Add as many Jitsi servers as you want
- Allow your partners to access your Jitsi server for different use-cases:
  - `domain partnership`: allow them to access the whole Jitsi server without
    sharing your secret key or the private key
  - `room partnership`: allow them to manage some Jitsi rooms
  - `meeting membership`: allow them to access some meetings as `moderator` or
    as `limited participant`
- Allow partnership using an invite link
- Allow membership using an invite link
- Create access links for unregistered users
- Create disposable or permanent access links
- Create scheduled meetings
- Calendar view for scheduled meetings
- Waiting room for scheduled meetings
- Direct call (_like a phone_)
- Manage your Jitsi profiles
- Ability to attach a profile to a specific meeting
- Unpredictable room name support. Create meeting links for anonymous Jitsi
  servers (such as `meet.jit.si`) and share these links with your members.
  Although the actual meeting link is updated periodically in the background
  (using some hashing algorithm), members can always join the meeting using its
  static `Galaxy` link. So, only your members can join this unprotected meeting
  room.
- Built-in JWT support
- Built-in [JaaS](https://jaas.8x8.vc) support
- Transfer all your Jitsi resources (rooms, meetings, partners, members, etc.)
  in one simple step to a new Jitsi server.

### Docker setup

Copy [env.sample](/env.sample) as `.env`, update parameters in it according to
your environment then start containers with `docker-compose`:

```bash
git clone https://github.com/emrahcom/galaxy-kc.git
cd galaxy-kc

cp env.sample .env

# Edit .env

docker-compose pull
docker-compose up -d
```

### Standalone setup

#### Prerequisites

- `Debian 12 Bookworm` server\
  _Use a dedicated server, not shared one... It will be heavily customized._
- At least 2 GB RAM and 6 GB disk space
- An `FQDN`. e.g. `app.galaxy.corp`
- A DNS `A record` for this `FQDN` pointing to the server
- Allow the following ports if the server is behind a firewall
  - `TCP/80` (_needed for Let's Encrypt certificate_)
  - `TCP/443`
- A `Keycloak` server

#### Installation

Run the following commands as `root`.

_Update the value of `GALAXY_FQDN` according to your domain name and
`KEYCLOAK_*` parameters according to your `Keycloak` configuration._

```bash
wget https://raw.githubusercontent.com/emrahcom/bookworm-lxc-base/main/installer/eb
wget https://raw.githubusercontent.com/emrahcom/galaxy-kc/main/installer/eb-galaxy-kc.conf

export GALAXY_FQDN="app.galaxy.corp"
export KEYCLOAK_ORIGIN="https://ucs-sso-ng.mydomain.corp"
export KEYCLOAK_REALM="ucs"
export KEYCLOAK_CLIENT_ID="galaxy"

bash eb eb-galaxy-kc
```

_If this is a test setup and you don't have resolvable FQDN, please set
`SKIP_DNS_CHECK` before installation_

```bash
export SKIP_DNS_CHECK=true
```

_If this is a test setup and your `Keycloak` doesn't have a trusted certificate,
please set `IGNORE_CERT_ERRORS` before installation_

```bash
export IGNORE_CERT_ERRORS=true
```

#### Let's Encrypt certificate

Let's say the host address of the application is `app.galaxy.corp`. To set the
Let's Encrypt certificate:

```bash
set-letsencrypt-cert app.galaxy.corp
```
