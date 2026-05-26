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

### Example Events
- `SEND_OTP`
- `USER_REGISTERED`
- `MESSAGE_SENT`

---

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

The entire application is fully containerized using **Docker** and orchestrated using **Docker Compose**.

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
│   ├── gateway-service/            # API Gateway
│   ├── user-service/               # Authentication Service
│   ├── chat-service/               # Real-Time Chat Service
│   ├── mail-service/               # OTP & Email Service
│
├── docker-compose.yml              # Docker Compose Config
│
├── screenshots/                    # README Images
│
└── README.md
```

---

# 📸 Screenshots

## Login Page
![Login](./screenshots/login.png)

## OTP Verification
![OTP](./screenshots/otp.png)

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
| User Service | 5001 |
| Chat Service | 5002 |
| Mail Service | 5003 |
| MongoDB | 27017 |
| Redis | 6379 |
| RabbitMQ | 5672 |
| RabbitMQ Dashboard | 15672 |

---

# 🌍 Environment Variables

## User Service `.env`

```env
PORT=5001

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret_key

RABBITMQ_URL=amqp://rabbitmq

REDIS_URL=redis://redis:6379

EMAIL_USER=your_email

EMAIL_PASS=your_email_password
```

---

## Chat Service `.env`

```env
PORT=5002

MONGO_URI=your_mongodb_uri

RABBITMQ_URL=amqp://rabbitmq

REDIS_URL=redis://redis:6379
```

---

## Mail Service `.env`

```env
PORT=5003

RABBITMQ_URL=amqp://rabbitmq

EMAIL_USER=your_email

EMAIL_PASS=your_email_password
```

---

# 🐳 Example Docker Compose

```yaml
version: '3.9'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"

  user-service:
    build: ./backend/user-service
    ports:
      - "5001:5001"

  chat-service:
    build: ./backend/chat-service
    ports:
      - "5002:5002"

  mail-service:
    build: ./backend/mail-service
    ports:
      - "5003:5003"

  redis:
    image: redis

  rabbitmq:
    image: rabbitmq:3-management
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
