include .env

up:
	docker-compose up --build -d

down:
	docker-compose down && docker system prune --volumes -f

restart:
	make down && make up

migrate:
	docker exec $(CONTAINER_NAME)-post-service npx prisma db push && docker exec $(CONTAINER_NAME)-post-service node ace migration:run

migrate-refresh:
	docker exec $(CONTAINER_NAME)-post-service npx prisma db push --force-reset && docker exec $(CONTAINER_NAME)-post-service node ace prisma-seeder:run && docker exec $(CONTAINER_NAME)-user-service node ace migration:fresh --seed

test:
	docker exec $(CONTAINER_NAME)-post-service node ace test && docker exec $(CONTAINER_NAME)-user-service node ace test