# Calendar

[![github/actions/workflow/status](https://img.shields.io/github/actions/workflow/status/brtmvdl/calendar/docker-push.yml)](https://img.shields.io/github/actions/workflow/status/brtmvdl/calendar/docker-push.yml) [![github/license](https://img.shields.io/github/license/brtmvdl/calendar)](https://img.shields.io/github/license/brtmvdl/calendar) [![github/stars](https://img.shields.io/github/stars/brtmvdl/calendar?style=social)](https://img.shields.io/github/stars/brtmvdl/antify?style=social)

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
