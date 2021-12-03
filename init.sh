#!/usr/bin/env bash


function config_db()
{
	echo "DATABASE_HOST = localhost">.env
	echo "DATABASE_PORT = 3306">>.env
	echo "DATABASE_USER = $USER">> .env
	echo "DATABASE_PASSWORD = $PASSWORD">> .env
	echo "DATABASE_NAME = $DATABASE_NAME">> .env
}

function config_app()
{
	echo -e "\nConfigurando.."
	mysql --user="$USER" --password="$PASSWORD" --execute="CREATE DATABASE IF NOT EXISTS $DATABASE_NAME;"
	cd ./to-do-app-frontend
	npm install
	npm run build
	gnome-terminal -- sh -c 'java -jar ../to-do-app-backend/target/to-do-app-backend-0.0.1-SNAPSHOT.jar'
	npm run start
}

DATABASE_NAME="todos_db"

read -p "Ingresa el usuario de MariaDb: " USER
read -s -p "Ingrese la contraseña de MariaDb: " PASSWORD

while ! mysql -u $USER -p$PASSWORD  -e ";" ; do
       read -s -p "No se puede conectar, vuelva a intentarlo: " PASSWORD
done

config_app "$USER" "$PASSWORD" "$DATABASE_NAME"



