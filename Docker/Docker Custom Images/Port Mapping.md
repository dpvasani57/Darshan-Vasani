# Port Mapping

---

## 🚪 Docker Port Mapping = Connecting Your App to the Outside World

> 💡 Think of a Docker container like a **house** 🏠 and ports as **doors** 🚪.
> You need to **open a door in the container AND connect it to your host** so people can visit. 🧑‍💻🌐

---

## 🎯 Syntax

```bash
docker run -p <hostPort>:<containerPort> <image>
```

| Element         | Description                          | Emoji Analogy                |
| --------------- | ------------------------------------ | ---------------------------- |
| `hostPort`      | Port on **your local machine (PC)**  | 🧑‍💻 Door outside the house |
| `containerPort` | Port **inside the Docker container** | 🏠 Door inside the house     |

---

## ✅ Common Examples

### 1. 🔁 Same port inside & outside

```bash
docker run -p 3000:3000 my-app
```

* App runs on port **3000** in container.
* Accessible at `http://localhost:3000` on host.

> 🧠 You "opened the same door" on both sides.

---

### 2. 🔀 Different ports (host vs container)

```bash
docker run -p 8080:3000 my-app
```

* App runs on port **3000** inside.
* Accessible at `http://localhost:8080` outside.

> 🧠 You redirected visitors from door 8080 to 3000 inside.

---

### 3. 🔢 Multiple ports

```bash
docker run -p 8000:8000 -p 5000:5000 my-app
```

> Multiple doors open 🔓 for frontend/backend or API/UI separation.

---

### 4. 🌐 Binding to specific IP (advanced)

```bash
docker run -p 127.0.0.1:8080:80 nginx
```

* Only accessible from localhost, not from other devices.

---

## 🧪 Testing Port Mappings

| Test Method        | Example Command                 | Purpose                    |
| ------------------ | ------------------------------- | -------------------------- |
| 🌐 Web Browser     | `http://localhost:8080`         | Access frontend/backend    |
| 🧪 `curl` CLI Tool | `curl localhost:8080`           | API/health check           |
| 🔍 Docker Inspect  | `docker container inspect <id>` | See exposed ports inside   |
| 📦 Docker PS       | `docker ps`                     | Shows active port mappings |

---

## ❗ Common Pitfalls & Fixes

| Problem                        | Cause                         | Fix                                     |
| ------------------------------ | ----------------------------- | --------------------------------------- |
| ❌ Cannot access app on browser | You forgot `-p`               | Always map with `-p`!                   |
| 🔒 Firewall blocking access    | System-level rules            | Allow port in your firewall             |
| 🚫 Conflicting ports           | Same host port already in use | Change host port (e.g., `-p 8081:3000`) |

---

## 🚀 Bonus Tip: EXPOSE in Dockerfile

```dockerfile
EXPOSE 3000
```

📌 *This is for documentation only!* It does **not publish** the port — you **still need `-p` during `docker run`**.

---

## 🧠 Quick Reference Table

| CLI Option               | Meaning                            | Example                      |
| ------------------------ | ---------------------------------- | ---------------------------- |
| `-p 8080:80`             | Host port 8080 → Container port 80 | `localhost:8080` opens NGINX |
| `-p 127.0.0.1:8000:8000` | Bind to specific host IP           | Secure dev testing           |
| `EXPOSE` in Dockerfile   | Internal doc (not binding)         | Use for image readability    |

---

## 🧭 Final Analogy: Port Mapping = Mail Forwarding 📬

Imagine:

* 🏠 Container address = Internal port (e.g. 3000)
* 🧑‍💻 Public address = Host port (e.g. 8080)
* 🔁 Port mapping forwards public requests to the container, like mail forwarding!

---

## ✅ Summary

| Step | What to Do                                              |
| ---- | ------------------------------------------------------- |
| 1️⃣  | Decide which port your app runs on inside the container |
| 2️⃣  | Map it using `-p hostPort:containerPort`                |
| 3️⃣  | Access it via `localhost:hostPort`                      |
| 4️⃣  | Check with `docker ps` to confirm mapping               |

---
