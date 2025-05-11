install:
	@make build
	@make up

build:
	docker compose build


up:
	docker compose up -d
