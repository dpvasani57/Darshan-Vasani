# 🐳 **Docker CLI Cheat Sheet**

*Your one-stop guide to mastering Docker commands* 🚀

---

## 📦 SECTION 1: Image Commands

| Command                         | Description                      | Example                      |
| ------------------------------- | -------------------------------- | ---------------------------- |
| `docker pull <image>`           | ⬇️ Pull an image from Docker Hub | `docker pull ubuntu`         |
| `docker images`                 | 📸 List all local images         | `docker images`              |
| `docker rmi <image>`            | 🗑️ Remove an image              | `docker rmi ubuntu`          |
| `docker tag <img> <repo>:<tag>` | 🏷️ Tag image for push or rename | `docker tag myimg myrepo:v1` |
| `docker build -t <tag> .`       | 🏗️ Build image from Dockerfile  | `docker build -t myapp .`    |

---

## 🐳 SECTION 2: Container Lifecycle

| Command                  | Description                                | Example                      |
| ------------------------ | ------------------------------------------ | ---------------------------- |
| `docker run <image>`     | 🚀 Run a container                         | `docker run ubuntu`          |
| `docker run -it <image>` | 🖥️ Interactive container with terminal    | `docker run -it ubuntu bash` |
| `docker run -d <image>`  | 🔄 Run in background (detached mode)       | `docker run -d nginx`        |
| `docker ps`              | 📋 List running containers                 | `docker ps`                  |
| `docker ps -a`           | 📋 List all containers (including stopped) | `docker ps -a`               |
| `docker stop <id>`       | 🛑 Stop a running container                | `docker stop 123abc`         |
| `docker start <id>`      | ▶️ Start a stopped container               | `docker start 123abc`        |
| `docker restart <id>`    | 🔁 Restart a container                     | `docker restart 123abc`      |
| `docker rm <id>`         | ❌ Remove a container                       | `docker rm 123abc`           |
| `docker logs <id>`       | 📜 View container logs                     | `docker logs 123abc`         |

---

## 📂 SECTION 3: Volume and Data Management

| Command                       | Description                      | Example                            |
| ----------------------------- | -------------------------------- | ---------------------------------- |
| `docker volume create <name>` | 🗃️ Create a volume              | `docker volume create myvol`       |
| `docker volume ls`            | 📋 List volumes                  | `docker volume ls`                 |
| `docker volume rm <name>`     | 🧹 Delete a volume               | `docker volume rm myvol`           |
| `-v host:container`           | 🔗 Mount volume inside container | `docker run -v $(pwd):/app ubuntu` |

---

## 🌐 SECTION 4: Networking

| Command                                    | Description                         | Example                               |
| ------------------------------------------ | ----------------------------------- | ------------------------------------- |
| `docker network ls`                        | 🌐 List networks                    | `docker network ls`                   |
| `docker network create <name>`             | 🛠️ Create a custom network         | `docker network create mynet`         |
| `docker network connect <net> <container>` | 🔌 Connect a container to a network | `docker network connect mynet webapp` |
| `-p host:container`                        | 🌍 Publish port to host             | `docker run -p 8080:80 nginx`         |

---

## 🧪 SECTION 5: Exec & Inspect

| Command                     | Description                                   | Example                    |
| --------------------------- | --------------------------------------------- | -------------------------- |
| `docker exec -it <id> bash` | 🛠️ Run command inside running container      | `docker exec -it web bash` |
| `docker inspect <id>`       | 🔍 Detailed info on container/image           | `docker inspect 123abc`    |
| `docker stats`              | 📈 Real-time usage (CPU, MEM)                 | `docker stats`             |
| `docker top <id>`           | 👨‍💻 Show running processes inside container | `docker top web`           |

---

## 🔄 SECTION 6: Save, Load, and Export

| Command                           | Description                    | Example                             |
| --------------------------------- | ------------------------------ | ----------------------------------- |
| `docker save -o <file>.tar <img>` | 💾 Save image to `.tar` file   | `docker save -o ubuntu.tar ubuntu`  |
| `docker load -i <file>.tar`       | 📤 Load image from tar file    | `docker load -i ubuntu.tar`         |
| `docker export <id> > file.tar`   | 📦 Export container filesystem | `docker export 123abc > ubuntu.tar` |
| `docker import <file>`            | 🔁 Import tar as image         | `docker import ubuntu.tar`          |

---

## ☁️ SECTION 7: DockerHub Login & Push

| Command                      | Description                | Example                    |
| ---------------------------- | -------------------------- | -------------------------- |
| `docker login`               | 🔐 Login to DockerHub      | `docker login`             |
| `docker logout`              | 🔓 Logout from DockerHub   | `docker logout`            |
| `docker push <user>/<image>` | 📤 Push image to DockerHub | `docker push myuser/myapp` |

---

## 📄 SECTION 8: Dockerfile Related

| Command  | Description                  | Example                  |
| -------- | ---------------------------- | ------------------------ |
| `FROM`   | 📦 Base image                | `FROM node:18`           |
| `COPY`   | 📁 Copy files                | `COPY . /app`            |
| `RUN`    | 🔧 Execute command in build  | `RUN npm install`        |
| `CMD`    | 🚀 Default container command | `CMD ["node", "app.js"]` |
| `EXPOSE` | 🌐 Document exposed port     | `EXPOSE 3000`            |

---

## 🚮 SECTION 9: Clean Up Docker

| Command                  | Description                                    | Example                  |
| ------------------------ | ---------------------------------------------- | ------------------------ |
| `docker system prune`    | 🧹 Remove all unused containers/images/volumes | `docker system prune`    |
| `docker image prune`     | 🖼️ Remove dangling images                     | `docker image prune`     |
| `docker container prune` | 🗑️ Remove stopped containers                  | `docker container prune` |
| `docker volume prune`    | 💾 Remove unused volumes                       | `docker volume prune`    |

---

## 🧠 Quick Tips

* Use `--rm` to auto-remove container on exit:

  ```
  docker run --rm ubuntu
  ```

* Run detached with name and port:

  ```
  docker run -d --name web -p 80:80 nginx
  ```

* Access logs live:

  ```
  docker logs -f <container_id>
  ```

---


# 🐳 Docker CLI Mastery with `--help`

*“Learn how to teach yourself every command with confidence.”*

---

## 🔍 1. Understanding `docker --help`

Start with:

```bash
docker --help
```

👉 Shows **all major command groups** like:

```
Commands:
  build       Build an image from a Dockerfile
  commit      Create a new image from a container's changes
  container   Manage containers
  image       Manage images
  volume      Manage volumes
  network     Manage networks
  ...
```

---

## 🧠 2. Drill Down into Subcommands with `--help`

You can add `--help` **to any subcommand** to discover available options.

### Examples:

| What to Explore                | Command                         |
| ------------------------------ | ------------------------------- |
| See all image-related commands | `docker image --help`           |
| See all container commands     | `docker container --help`       |
| See all run options            | `docker run --help`             |
| See help for specific action   | `docker container start --help` |

---

## 📚 3. Section-Wise Docker Command Reference

Let’s now organize all commands by category — and how to learn more using `--help`.

---

### 📦 A. Docker Image Commands

| Command                | Description                 | Help Command                  |
| ---------------------- | --------------------------- | ----------------------------- |
| `docker image ls`      | List images                 | `docker image ls --help`      |
| `docker image pull`    | Pull image from registry    | `docker image pull --help`    |
| `docker image rm`      | Remove image                | `docker image rm --help`      |
| `docker image build`   | Build image from Dockerfile | `docker image build --help`   |
| `docker image tag`     | Tag image                   | `docker image tag --help`     |
| `docker image inspect` | Inspect image metadata      | `docker image inspect --help` |
| `docker image prune`   | Remove unused images        | `docker image prune --help`   |

🔍 Explore: `docker image --help`

---

### 🐳 B. Docker Container Commands

| Command                       | Description                      | Help Command                      |
| ----------------------------- | -------------------------------- | --------------------------------- |
| `docker container ls`         | List containers                  | `docker container ls --help`      |
| `docker container run`        | Create & start new container     | `docker run --help`               |
| `docker container start/stop` | Start/Stop container             | `docker container start --help`   |
| `docker container exec`       | Execute inside running container | `docker exec --help`              |
| `docker container logs`       | Show logs                        | `docker logs --help`              |
| `docker container rm`         | Remove container                 | `docker container rm --help`      |
| `docker container inspect`    | Inspect container info           | `docker container inspect --help` |
| `docker container prune`      | Remove all stopped containers    | `docker container prune --help`   |

🔍 Explore: `docker container --help`

---

### 📂 C. Docker Volume Commands

| Command                 | Description           | Help Command                   |
| ----------------------- | --------------------- | ------------------------------ |
| `docker volume create`  | Create volume         | `docker volume create --help`  |
| `docker volume ls`      | List volumes          | `docker volume ls --help`      |
| `docker volume inspect` | Inspect volume        | `docker volume inspect --help` |
| `docker volume rm`      | Remove volume         | `docker volume rm --help`      |
| `docker volume prune`   | Delete unused volumes | `docker volume prune --help`   |

🔍 Explore: `docker volume --help`

---

### 🌐 D. Docker Network Commands

| Command                  | Description                  | Help Command                    |
| ------------------------ | ---------------------------- | ------------------------------- |
| `docker network create`  | Create a custom network      | `docker network create --help`  |
| `docker network ls`      | List all networks            | `docker network ls --help`      |
| `docker network connect` | Connect container to network | `docker network connect --help` |
| `docker network inspect` | Network details              | `docker network inspect --help` |
| `docker network rm`      | Remove network               | `docker network rm --help`      |

🔍 Explore: `docker network --help`

---

### 🔄 E. Docker System Cleanup

| Command                               | Description                  | Help Command                 |
| ------------------------------------- | ---------------------------- | ---------------------------- |
| `docker system df`                    | Show disk usage              | `docker system df --help`    |
| `docker system prune`                 | Remove unused data           | `docker system prune --help` |
| `docker image/container/volume prune` | Cleanup individual resources | Add `--help` accordingly     |

🔍 Explore: `docker system --help`

---

### ☁️ F. Docker Registry (DockerHub)

| Command         | Description              | Help Command           |
| --------------- | ------------------------ | ---------------------- |
| `docker login`  | Login to DockerHub       | `docker login --help`  |
| `docker logout` | Logout                   | `docker logout --help` |
| `docker push`   | Push image to registry   | `docker push --help`   |
| `docker pull`   | Pull image from registry | `docker pull --help`   |

---

### 🧪 G. Docker Exec/Inspect/Debug

| Command          | Description                | Help Command            |
| ---------------- | -------------------------- | ----------------------- |
| `docker exec`    | Run inside container       | `docker exec --help`    |
| `docker logs`    | Show logs                  | `docker logs --help`    |
| `docker inspect` | Deep object metadata       | `docker inspect --help` |
| `docker stats`   | Real-time resource usage   | `docker stats --help`   |
| `docker top`     | Processes inside container | `docker top --help`     |

---

### 🧱 H. Docker Build Context

| Command          | Description                       | Help Command            |
| ---------------- | --------------------------------- | ----------------------- |
| `docker build`   | Build image from Dockerfile       | `docker build --help`   |
| `docker commit`  | Create image from container state | `docker commit --help`  |
| `docker history` | Layer history of image            | `docker history --help` |

---

## 💡 BONUS: Global Docker Options (`docker --help`)

At the very top level, Docker offers global flags too:

| Option      | Description                   |
| ----------- | ----------------------------- |
| `--config`  | Use custom Docker config path |
| `--context` | Use a specific context        |
| `--debug`   | Enable debug mode             |
| `--version` | Show Docker version           |
| `--help`    | Show help for any command     |

---

## 📦 Final Tip: Combine Flags for Mastery

Example of full command:

```bash
docker run -it --rm -v $(pwd):/app -p 3000:3000 --name myapp node bash
```

---
