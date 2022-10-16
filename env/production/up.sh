sudo docker-compose -f ./docker-compose.yaml run app npm ci

sudo docker-compose -f ./docker-compose.yaml up -d --remove-orphans --force-recreate --build 
