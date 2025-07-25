## 🐳 Docker Cheatsheet for Node.js App

---

### 📦 Build Docker Image

```bash
# 🧪 Build the Docker image and tag it as 'my-node-app'
docker build -t my-node-app .
```

---

### 🚀 Run the Container

```bash
# 🧪 Run the container and expose it on localhost:8000
docker run -p 8000:8000 my-node-app
```

```bash
# 🧪 Run the container in detached/background mode
docker run -d -p 8000:8000 my-node-app
```

```bash
# 🧪 Run an interactive Ubuntu container (good for testing)
docker run -it ubuntu
```

---

### 📋 Inspect Containers and Images

```bash
# 🧪 List running containers
docker ps
```

```bash
# 🧪 List all containers (running + stopped)
docker ps -a
```

```bash
# 🧪 List all Docker images available locally
docker images
```

---

### 🛑 Stop and Remove Containers

```bash
# 🧪 Stop a running container
docker stop <container_id_or_name>
```

```bash
# 🧪 Remove a stopped container
docker rm <container_id_or_name>
```

```bash
# 🧪 Remove a Docker image by name or ID
docker rmi my-node-app
```

---

### 🔍 View Logs and Inspect Details

```bash
# 🧪 View logs from a container (stdout/stderr)
docker logs <container_id>
```

```bash
# 🧪 Inspect detailed info of a container
docker inspect <container_id>
```

---

### 🧼 Clean Up Unused Resources

```bash
# 🧪 Remove all stopped containers
docker container prune
```

```bash
# 🧪 Remove all unused Docker images
docker image prune
```

```bash
# 🧪 Remove all unused data (containers, networks, images, etc.)
docker system prune
```

---

### 🧾 Bonus: Access Bash in a Running Container

```bash
# 🧪 Access container shell (if bash is installed inside)
docker exec -it <container_id> /bin/bash
```

---

