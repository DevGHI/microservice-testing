Microservice Testing
This is a repository for Microservice Testing. This include two services which is "post-service" and "user-service".I used RabbitMQ to communicate each service and nginx server as api gateway and Japa for test case.
technology in post-serive : AdonisJS,MongoDB,Prisma
technology in user-service : AdonisJS,MySQL
(RabbitMQ,MongoDB,MySQL are used online service so that you don't need to configure in local)



Prerequisites
Before running this code, you need to have the following installed on your system:

Git
docker & docker-compose
Makefiles ( build automation tool )


Installation
To install this code, follow these steps:

1.Clone the repository to your local machine using Git:
git clone git@github.com:DevGHI/microservice-testing.git

2.Navigate to the project directory:
cd microservice-testing

3.Run the code:
make up

4.Run Migration & Seeder
make migrate-refresh

5.complete, test users & post api  
http://localhost/users
http://localhost/posts


Testing
To run the tests for this code, follow these steps:

1.Navigate to the project directory if you are not already there:
cd microservice-testing

2.Run the tests:
make test

3.Reset Database to default
make migrate-refresh