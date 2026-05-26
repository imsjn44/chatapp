# 💬 Real-Time Instant Chat App

A scalable real-time chat application built using **Next.js**, **Socket.IO**, **Redis**, **RabbitMQ**, and **Docker** with a complete **Microservices Architecture**.

The application enables users to securely authenticate using Email OTP verification and communicate instantly through real-time text and image messaging.

---

# 🚀 Features

## 🔐 Authentication System
- Email OTP Login
- Secure OTP verification
- JWT Authentication
- Protected user sessions

## 👥 User Features
- View all registered users
- Start one-to-one conversations
- Update and change username
- Real-time online communication

## 💬 Real-Time Messaging
- Instant text messaging using **Socket.IO**
- Real-time typing indicators
- Live chat synchronization
- Fast low-latency communication

## 🖼️ Image Sharing
- Send and receive images in real time
- Instant media synchronization

## ⚡ Live Real-Time Features
- Typing status (`Typing...`)
- Online/offline user tracking
- Instant message delivery
- Real-time image updates

---

# 🏗️ Microservices Architecture

The backend follows a scalable **Microservices Architecture** where each service handles a dedicated responsibility.

## 🧩 Backend Services

### 👤 User Service
Responsible for:
- User authentication
- OTP verification
- JWT token generation
- User profile management

### 💬 Chat Service
Responsible for:
- Real-time messaging
- Socket.IO communication
- Typing indicators
- Message storage
- Image message handling

### 📧 Mail Service
Responsible for:
- Sending OTP emails
- Email notifications
- Mail queue processing

### 🌐 API Gateway
Responsible for:
- Centralized routing
- Request forwarding
- API aggregation
- Authentication middleware

---

# ⚡ RabbitMQ Integration

The application uses **RabbitMQ** as a message broker for asynchronous communication between microservices.

## RabbitMQ Responsibilities
- OTP email queue handling
- Event-driven communication
- Decoupled service communication
- Reliable background processing

# 🔴 Redis Integration

The application uses **Redis** for caching and real-time performance optimization.

## Redis Responsibilities
- Socket session storage
- User online status tracking
- Typing indicator management
- Frequently accessed data caching
- Pub/Sub communication

---

# 🐳 Docker Containerization

The entire application is fully containerized using **Docker**.
# 🐳 Docker & RabbitMQ Setup

## Install Docker on Ubuntu

### Update Package List

```bash
sudo apt-get update -y
```

---

### Install Docker

```bash
sudo apt-get install docker.io -y
```

---

### Enable and Start Docker Service

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

---

### Give Current User Permission to Run Docker Commands

```bash
sudo usermod -aG docker $USER
```

> Logout and login again after running the above command.

---

# 🐇 RabbitMQ Setup Using Docker

## Pull and Run RabbitMQ Container

```bash
sudo docker run -d \
  --hostname rabbitmq-host \
  --name rabbitmq-container \
  -e RABBITMQ_DEFAULT_USER=admin \
  -e RABBITMQ_DEFAULT_PASS=admin123 \
  -p 5672:5672 \
  -p 15672:15672 \
  rabbitmq:3-management
```

---

# 🌐 RabbitMQ Management Dashboard

Access RabbitMQ Dashboard:

```bash
http://localhost:15672
```

## Default Login Credentials

```bash
Username: admin
Password: admin123
```

---

# 📦 RabbitMQ Ports

| Port | Purpose |
|---|---|
| 5672 | RabbitMQ Messaging Port |
| 15672 | RabbitMQ Management Dashboard |

---

# ✅ Verify Running Containers

```bash
docker ps
```

---

# 🛑 Stop RabbitMQ Container

```bash
docker stop rabbitmq-container
```

---

# ▶️ Start RabbitMQ Container Again

```bash
docker start rabbitmq-container
```

---

# ❌ Remove RabbitMQ Container

```bash
docker rm -f rabbitmq-container
```

# 🛠️ Tech Stack

## Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Socket.IO Client

## Backend
- Node.js
- Express.js
- Socket.IO
- RabbitMQ
- Redis
- Docker
- Microservices Architecture

## Database
- MongoDB

## Authentication
- JWT Authentication
- Email OTP Verification

## Real-Time Communication
- WebSockets (Socket.IO)
- Redis Pub/Sub

---

# 📂 Project Structure

```bash
chat-app/
│
├── frontend/                        # Next.js Frontend
│
├── backend/
│   ├── proxy/            # API Gateway
│   ├── user/               # Authentication Service
│   ├── chat/               # Real-Time Chat Service
│   ├── mail/               # OTP & Email Service
└── README.md
```

---

# 📸 Screenshots

## 🔐 Login Page

<p align="center">
  <img src="https://github.com/user-attachments/assets/25f8af6b-b089-4c4a-aa41-d1b3e6298a29" width="600"/>
</p>

---

## 🔑 OTP Verification

<p align="center">
  <img src="https://github.com/user-attachments/assets/3bc9a4fe-8ecc-4393-9dfa-31e50905998c" width="600"/>
</p>

---

## 👥 User Dashboard

<p align="center">
  <img src="https://github.com/user-attachments/assets/1adfc4a0-6011-46d9-957c-7b1681aa1e98" width="400"/>
</p>

---

## 💬 Real-Time Chat

<p align="center">
  <img src="https://github.com/user-attachments/assets/70626dc1-dfea-4a85-ac62-fcb4167b7b6b" width="800"/>
</p>

---

## ⌨️ Typing Indicator

<p align="center">
  <img src="https://github.com/user-attachments/assets/d6332802-7067-4f9c-92eb-e282eb2bb27f" width="700"/>
</p>

---

## 🖼️ Image Sharing

<p align="center">
  <img src="https://github.com/user-attachments/assets/aab26d63-1408-4745-88c8-8a47b6b34110" width="800"/>
</p>


---

## 👤 Profile Update

<p align="center">
  <img src="https://github.com/user-attachments/assets/42b27c5d-4cc7-49ad-af18-6478a7d47b0a" width="600"/>
</p>
---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/chat-app.git
```


## 2️⃣ Install Dependencies (All Services)

### Frontend
```bash
cd frontend
npm install
```

### User 
```bash
cd backend/user-service
npm install
npm run dev
```

### Chat
```bash
cd backend/chat-service
npm install
npm run dev
```

### Mail 
```bash
cd backend/mail-service
npm install
npm run dev
```

---
---

# 🐳 Run Using Docker

## Build and Start Containers

```bash
docker-compose up --build
```

---

# 🛑 Stop Containers

```bash
docker-compose down
```

---

# 🌍 Services Running

| Service | Port |
|---|---|
| Frontend | 3000 |
| API Gateway | 5000 |
| User  | 5000 |
| Chat | 5002 |
| Mail Service | 5001 |
| MongoDB | 27017 |
| Redis | 6379 |
| RabbitMQ | 5672 |
| RabbitMQ Dashboard | 15672 |

---

# 🌍 Environment Variables

## User `.env`

```env

MONGO_URI=mongodb://

PORT=

REDIS_URL=redis://redis:6379

RABBITMQ_USERNAME=
RABBITMQ_PASSWORD=
RABBITMQ_HOST=

OR

RABBITMQ_URL==amqp://rabbitmq

JWT_SECRET=

```

---

## Mail  `.env`

```env
RABBITMQ_USERNAME=

RABBITMQ_PASSWORD=

RABBITMQ_HOST=
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
#Google Account app user & password
USER=

PASSWORD=
----------------------------------------------------------------------------------------------------------------------------------------------------------------------
PORT=5001

RESEND_API_KEY=re_

RABBITMQ_URL=amqps://
```

---

## Chat `.env`

```env

MONGO_URI=mongodb://

JWT_SECRET=

USER_SERVICE=

CHAT_SERVICE=

CLOUD_NAME=

CLOUD_API_KEY=

CLOUD_API_SECRET=

PORT=5002

FRONTEND_URL=

```

---
## Proxy `.env`

```env


USER_SERVICE=

CHAT_SERVICE=

MAIL_SERVICE=

```

---



# 🔄 Real-Time Features

- Socket.IO real-time communication
- Redis Publisgher/Subscriber synchronization
- Live typing indicators
- Online/offline presence tracking
- Instant image sharing
- Scalable WebSocket handling

---

# 📡 API Architecture

## User Service APIs
- Login with Email
- Verify OTP
- Update Profile
- Fetch Users

## Chat Service APIs
- Send Message
- Fetch Messages
- Upload Images
- Socket Events

## Mail Service APIs
- Send OTP
- Queue Email Jobs

---

# 🔮 Future Improvements

- Group Chats
- Voice & Video Calls
- Read Receipts
- Push Notifications
- Message Reactions
- End-to-End Encryption
- Dark Mode
- File Sharing

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your branch
3. Commit your changes
4. Push the branch
5. Open a Pull Request

---

# 📜 License

This project is licensed under the MIT License.

---

# ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!
