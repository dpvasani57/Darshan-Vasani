# 🧭 Docker Port Mapping & CLI Flag CheatSheet

---

## 🚪 Port Mapping 101: `-p` vs `-P`

| Flag                    | Meaning                                         | Analogy                | Example        |
| ----------------------- | ----------------------------------------------- | ---------------------- | -------------- |
| `-p <host>:<container>` | Map host port to container port                 | Custom Door Mapping 🚪 | `-p 8080:3000` |
| `-P` (uppercase)        | Auto-map all exposed ports to random host ports | 🔀 Auto Door Mapping   | `-P`           |

---

### 🎯 Example 1: Manual Mapping with `-p`

```bash
docker run -p 8080:3000 my-app
```

* 🔧 Host port **8080** mapped to container's **3000**
* Access via `localhost:8080`

---

### 🎲 Example 2: Auto Mapping with `-P`

```bash
docker run -P my-app
```

* Maps **ALL `EXPOSE`d ports** to **random available host ports**
* View with `docker ps`

---

## 🌍 Multiple Port Mappings

```bash
docker run -p 3000:3000 -p 5000:5000 my-multi-app
```

* Maps **multiple services/APIs** or frontend/backend apps
* Great for full-stack containers!

---

## 📡 Exposing Ports in Dockerfile

```dockerfile
EXPOSE 3000 5000 7000
```

| 🧠 Note:                                                                           |
| ---------------------------------------------------------------------------------- |
| `EXPOSE` is **just documentation** for which ports the container listens to.       |
| It **does not** publish or map ports. Use `-p` or `-P` in `docker run` to do that. |

---

## 📦 Exposing a Range of Ports

```bash
docker run -p 8000-8010:8000-8010 my-app
```

* Useful for services like **WebRTC**, **game servers**, or **load balancers** needing multiple ports.
* 🔄 Keep range symmetrical between host and container.

---

## 🧪 Combine with `--rm`, `-it`, `-d`

| Flag   | Meaning                             | Emoji | Use-case                 |
| ------ | ----------------------------------- | ----- | ------------------------ |
| `--rm` | Auto-remove container when it exits | 🧹    | Clean test runs          |
| `-i`   | Interactive (stdin open)            | 🎤    | Needed for terminal apps |
| `-t`   | TTY (format output)                 | 🖥️   | Pretty output formatting |
| `-it`  | Combo: interactive + tty            | 🧑‍💻 | Needed for shell, REPLs  |
| `-d`   | Detached mode (run in background)   | 🛸    | Long-running servers     |

---

### 🔥 Full Command Example

```bash
docker run -it --rm -p 4000:3000 my-app
```

* Runs interactively
* Auto deletes after exit
* Maps port 3000 → 4000

---

### 🚀 Run in Detached Mode + Multiple Ports + Clean Exit

```bash
docker run -d --rm -p 3000:3000 -p 5000:5000 my-app
```

* Runs in background
* Auto-cleans after stopping
* Maps frontend + backend

---

## 🕵️‍♂️ How to Check Mapped Ports?

```bash
docker ps
```

| Column  | What it Shows                                            |
| ------- | -------------------------------------------------------- |
| `PORTS` | Host\:Container mapping (e.g., `0.0.0.0:8080->3000/tcp`) |

---

## 🛑 Stop a Detached Container

```bash
docker stop <container_id>
```

---

## 🧠 Real-World Analogies

| Concept        | Analogy                                       |
| -------------- | --------------------------------------------- |
| Container port | 📦 Internal phone extension                   |
| Host port      | ☎️ Public phone number                        |
| `-p`           | Assigning specific number to extension        |
| `-P`           | Letting system pick a number for you randomly |

---

## ✅ Summary Cheatsheet Table

| Option                   | Purpose                    | Usage            |
| ------------------------ | -------------------------- | ---------------- |
| `-p 8080:80`             | Manual port map            | `host:container` |
| `-p 8000-8010:8000-8010` | Port range mapping         | Bulk apps        |
| `-P`                     | Auto-map all exposed ports | Quick tests      |
| `EXPOSE 3000`            | Doc port in Dockerfile     | Doesn't publish  |
| `--rm`                   | Auto-remove after exit     | Clean containers |
| `-it`                    | Interactive terminal       | Needed for shell |
| `-d`                     | Run in background          | Daemonized apps  |

---

## 🧾 Real Full Example: Production-style Run

```bash
docker run -d --rm \
  -p 8080:80 \
  -p 443:443 \
  --name my-nginx \
  nginx:alpine
```

✅ Starts Nginx with HTTP & HTTPS
✅ Cleans itself after `docker stop`
✅ Runs in background with custom name

---

## 🧠 Bonus Tip: Use `--network` to map ports between containers!

