# 🚢 Docker Learning Repository by Darshan Vasani

Welcome to my comprehensive **Docker Learning Repository**! This repo is a structured collection of everything I’ve learned about Docker and containerization — from basic CLI usage to orchestration using AWS ECS. Perfect for developers looking to **master Docker step-by-step**.

---

## 📁 Repository Structure

Each folder in this repo contains topic-wise **notes**, **examples**, and **practical labs** to help you learn Docker efficiently.

| Sr. No | Folder Name                     | Description                                                                 |
|--------|----------------------------------|-----------------------------------------------------------------------------|
| 1️⃣     | `Docker Command Line Interface` | Basic to advanced Docker CLI commands and usage                             |
| 2️⃣     | `Docker Compose`               | Multi-container applications using `docker-compose.yml`                     |
| 3️⃣     | `Docker Custom Images`         | Creating custom Docker images using Dockerfiles                             |
| 4️⃣     | `Docker for Developers`        | Docker use-cases for Node.js/TypeScript apps with debugging and hot reload  |
| 5️⃣     | `Docker Networking`            | Docker bridge, host, overlay, and custom networks                           |
| 6️⃣     | `Docker Orchestration`         | Orchestration using **Docker Swarm** and **AWS ECS (Elastic Container Service)** |
| 7️⃣     | `Docker Volumes`               | Persistent storage, named/anonymous volumes, and bind mounts                |
| 8️⃣     | `Node`                         | Dockerizing Node.js applications with production best practices             |
| 9️⃣     | `Ts`                           | TypeScript-specific containerization patterns                               |

---

## 🐳 Why Docker?

Docker simplifies app development by packaging code with all dependencies into a **portable container**. It solves "It works on my machine" bugs and makes CI/CD pipelines smoother.

---

## 📘 How to Use This Repo

1. Clone this repo:
   ```bash
   git clone https://github.com/your-username/docker-learning.git
   cd docker-learning
   ```

2. Explore topics in order or jump directly to a directory of your choice.

3. Each folder contains:

   * ✍️ `README.md` or notes
   * 💻 Sample Dockerfiles
   * ⚙️ Compose files
   * ✅ Step-by-step commands and examples

---

## ✅ Sample Learning Path

> Recommended if you're starting from scratch:

1. `Docker Command Line Interface` → Basics
2. `Docker Custom Images` → Create your own image
3. `Docker Volumes` + `Docker Networking`
4. `Docker Compose` → Multi-container setup
5. `Node` + `Ts` → Dockerize real-world apps
6. `Docker Orchestration` → Swarm + ECS
7. `Docker for Developers` → Debugging, hot reload
8. 🎯 Apply to your own projects!

---

## 🧪 Testing Your Docker Projects

If you’ve deployed a Node.js app:

### 🔁 Build and Run:

```bash
docker build -t my-node-app .
docker run -p 3000:3000 my-node-app
```

### ✅ Test Locally:

Visit `http://localhost:3000` in your browser.

### 🧪 Docker Compose Testing:

```bash
docker-compose up --build
```

### 📈 Production Tips:

* Use multi-stage builds to reduce image size.
* Add health checks to Dockerfiles and Compose.
* Use `.dockerignore` to optimize builds.
* Use `docker stats`, `docker top`, `docker logs` for monitoring.

---

## 🚀 Deploying on ECS (Orchestration)

Inside `Docker Orchestration/`, you’ll find:

* ECS task definitions
* Load Balancer setup instructions
* Auto-scaling setup
* Health checks and cloud best practices
* Manual and automatic scaling guides
* Notes on pushing images to ECR:

  ```bash
  aws ecr get-login-password | docker login --username AWS --password-stdin <account>.dkr.ecr.region.amazonaws.com
  docker tag my-node-app <ecr-url>:latest
  docker push <ecr-url>:latest
  ```

---

## 📦 Sample .dockerignore

```bash
node_modules
dist
*.log
.env
Dockerfile.dev
```

---

## 🌟 Star this Repo if You Found It Useful!

Let’s containerize everything! 🐳🔥
Pull requests, suggestions, and issues are welcome!
---
## 👨‍💻 Author  

### 🚀 **Darshan Vasani**  
💡 **Full-Stack Developer | Software Engineer | Mentor**    

### 🔗 Connect with me! 🌍  
🌐 **Portfolio:** [dpvasani56.vercel.app](https://dpvasani56.vercel.app/)  
🐙 **GitHub:** [github.com/dpvasani](https://github.com/dpvasani)  
💼 **LinkedIn:** [linkedin.com/in/dpvasani56](https://www.linkedin.com/in/dpvasani56/)  
🌳 **Linktree:** [linktr.ee/dpvasani56](https://linktr.ee/dpvasani56)  
🎓 **Credly:** [credly.com/users/dpvasani57](https://www.credly.com/users/dpvasani57/)  
🐦 **Twitter:** [x.com/vasanidarshan56](https://x.com/vasanidarshan56)  
📢 **Topmate:** [topmate.io/dpvasani56](https://topmate.io/dpvasani56)  

---