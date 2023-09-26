# Calendar

[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/brtmvdl/calendar/docker-pull.yml?label=Docker%20pull&link=https%3A%2F%2Fgithub.com%2Fbrtmvdl%2Fcalendar%2Factions%2Fworkflows%2Fdocker-pull.yml)](https://github.com/brtmvdl/calendar/blob/main/.github/workflows/docker-push.yml) [![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/brtmvdl/calendar/docker-push.yml?label=Docker%20push&link=https%3A%2F%2Fgithub.com%2Fbrtmvdl%2Fcalendar%2Factions%2Fworkflows%2Fdocker-push.yml)](https://github.com/brtmvdl/calendar/actions/workflows/docker-push.yml) [![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/brtmvdl/calendar/github-release.yml?label=GitHub%20release&link=https%3A%2F%2Fgithub.com%2Fbrtmvdl%2Fcalendar%2Factions%2Fworkflows%2Fgithub-release.yml)](https://github.com/brtmvdl/calendar/actions/workflows/github-release.yml) [![github/license](https://img.shields.io/github/license/brtmvdl/calendar)](https://img.shields.io/github/license/brtmvdl/calendar)  [![github/stars](https://img.shields.io/github/stars/brtmvdl/calendar?style=social)](https://img.shields.io/github/stars/brtmvdl/calendar?style=social)

App to manage tasks.

## Stack

[Docker](https://www.docker.com/)

[Node.js](https://nodejs.org/en/)

## How to

### Production

```sh
docker run -d -p 80:80 tmvdl/projects:calendar
```

### Development

```sh
bash env/pull.sh 

bash env/install.sh 

bash env/up.sh 
```

## License

[MIT](./LICENSE)
