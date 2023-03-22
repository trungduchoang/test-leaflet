# Development enviroment
install:
	yarn install --pure-lockfile

build-dev: 
	docker-compose -f docker-compose.dev.yml build

dev: 
	docker-compose -f docker-compose.dev.yml up

# Convenient push command (make push m="")
push:
	git add .
	git commit -m '$(m)'
	git push

# Production enviroment
build-prod:
	docker-compose -f docker-compose.prod.yml up --build

prod:
	docker-compose -f docker-compose.prod.yml up