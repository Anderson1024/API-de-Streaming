API de Streaming
API REST de streaming desenvolvida com Node.js, Express e MongoDB. Permite gerenciar usuários, vídeos, histórico de visualizações e gerar rankings de conteúdos e usuários mais ativos utilizando Aggregation do MongoDB.


Tecnologias:
- Node.js
- Express
- MongoDB
- Mongoose

Rotas principais:

POST /users
GET /users

POST /videos
GET /videos

POST /history
GET /history/user/:id

GET /stats/ranking/videos
GET /stats/ranking/users
