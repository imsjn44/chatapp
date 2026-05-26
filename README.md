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

## Login Page
![Login<img width="717" height="752" alt="Screenshot 2026-05-26 175014" src="https://github.com/user-attachments/assets/544c0993-adf3-421c-8704-a47d6d67b8eb" />
](./screenshots/login.png)<img width="592" height="545" alt="Screenshot 2026-05-26 174847" src="https://github.com/user-attachments/assets/658a96ed-534d-471d-a710-a70bebb0c6e1" />


## OTP Verification
![OTP](./screenshots/otp.png)![Uploading Screenshot 2026-05-26 175014.png…]()


## User Dashboard
![Dashboard](./screenshots/dashboard.png)

## Real-Time Chat
![Chat](./screenshots/chat.png)

## Typing Indicator
![Typing](./screenshots/typing.png)

## Image Sharing
![Images](./screenshots/image-sharing.png)

## Profile Update
![Profile](./screenshots/profile.png)

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/chat-app.git
```

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
| Chat S | 5002 |
| Mail Service | 5001 |
| MongoDB | 27017 |
| Redis | 6379 |
| RabbitMQ | 5672 |
| RabbitMQ Dashboard | 15672 |

---

# 🌍 Environment Variables

## User `.env`

```env
MONGO_URI=your_mongodb_uri
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

#Google account app password
USER=

PASSWORD=

PORT=5001

RESEND_API_KEY=re_a97L4Cjj_...

RABBITMQ_URL=amqps://kadepegx......
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
