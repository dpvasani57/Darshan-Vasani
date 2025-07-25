#📘 Complete Docker Image Publishing CheatSheet 🐳🚀
---
## 🌐 What is a Docker Registry?

A **Docker registry** is a **storage for Docker images** 🗃️. You can:

* ✅ **Push** your custom images to it
* 📥 **Pull** images when needed
* 🔐 Optionally **set them private/public**

### 🏠 Popular Registries:

* 🐳 Docker Hub (hub.docker.com)
* 🔐 GitHub Container Registry (ghcr.io)
* ☁️ Google Artifact Registry / Amazon ECR / GitLab / Azure ACR

---

## ✨ Structure of Docker Image Name

```
<registry>/<username>/<repo>:<tag>
```

| Part     | Example               | Meaning                        |
| -------- | --------------------- | ------------------------------ |
| Registry | `docker.io` (default) | Where image is stored 🌍       |
| Username | `dpvasani56`          | Your DockerHub or GitHub ID 👤 |
| Repo     | `node-application`    | Your app/project name 📦       |
| Tag      | `v1`, `latest`        | Version tag 🏷️                |

---

## 🚀 Two Ways to Publish Docker Image to Docker Hub

### 📦 Step 0: Build the image

```bash
docker build -t dpvasani56/node-application:v1 .
```

---

### 🧭 Method 1: **Manual Push to Docker Hub**

#### ✅ Step-by-step:

1️⃣ **Login to Docker Hub**

```bash
docker login
```

🧠 Enter your Docker Hub username and password.

---

2️⃣ **Push your image**

```bash
docker push dpvasani56/node-application:v1
```

✅ Image will now appear on your Docker Hub at:
📍 `https://hub.docker.com/r/dpvasani56/node-application`

---

3️⃣ **Pull from any system**

```bash
docker pull dpvasani56/node-application:v1
```

🎯 Then run:

```bash
docker run -p 3000:3000 dpvasani56/node-application:v1
```

---

### 🧠 Method 2: **Push from GitHub via GitHub Container Registry (ghcr.io)**

---

### 🔧 Step-by-step:

1️⃣ **Create a GitHub repo**

Name it like: `node-application`

---

2️⃣ **Login to GitHub Container Registry**

```bash
echo <GH_TOKEN> | docker login ghcr.io -u USERNAME --password-stdin
```

> 💡 Use a **Personal Access Token (PAT)** from GitHub with `write:packages` permission.

---

3️⃣ **Tag your image**

```bash
docker tag node-application ghcr.io/dpvasani56/node-application:v1
```

---

4️⃣ **Push to GitHub Container Registry**

```bash
docker push ghcr.io/dpvasani56/node-application:v1
```

✅ Image is now available at:
🔗 `https://github.com/dpvasani56/packages`

---

## 📌 Tagging Summary

```bash
# Tag for DockerHub
docker tag node-application dpvasani56/node-application:v1

# Tag for GitHub Registry
docker tag node-application ghcr.io/dpvasani56/node-application:v1
```

---

## 🧼 Optional Cleanup

```bash
docker image rm <image-name>
```

Use this to save space once pushed.

---

## 🧠 Bonus: Automate with GitHub Actions

Use this snippet in `.github/workflows/docker.yml`:

```yaml
jobs:
  push_to_registry:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Log in to GitHub Container Registry
        run: echo "${{ secrets.GH_PAT }}" | docker login ghcr.io -u dpvasani56 --password-stdin

      - name: Build and Push
        run: |
          docker build -t ghcr.io/dpvasani56/node-application:v1 .
          docker push ghcr.io/dpvasani56/node-application:v1
```

✅ Set `GH_PAT` as a GitHub secret with correct permissions.

---

## 🔥 Quick Recap Table

| Action | Docker Hub                      | GitHub Container Registry               |
| ------ | ------------------------------- | --------------------------------------- |
| Login  | `docker login`                  | `docker login ghcr.io`                  |
| Tag    | `dpvasani56/app:v1`             | `ghcr.io/dpvasani56/app:v1`             |
| Push   | `docker push dpvasani56/app:v1` | `docker push ghcr.io/dpvasani56/app:v1` |
| Pull   | `docker pull dpvasani56/app:v1` | `docker pull ghcr.io/dpvasani56/app:v1` |

---

## 🧾 Sample Push Command (Your Request)

```bash
docker push dpvasani56/node-application:v1
```

✅ This pushes your image to Docker Hub under your account.

---


## 🏷️ Step-by-Step: Tag & Push Docker Image to Docker Hub (`dpvasani56/node-application`)

Assume your image is locally named:

```bash
my-app
```

And you want to push it as:
📦 `dpvasani56/node-application`

---

### 🔧 Step 1: Tag the Image

> 🏷️ Think of this as **giving your image a Docker Hub label** 🎫

```bash
docker tag my-app dpvasani56/node-application
```

✅ This tags your image for Docker Hub upload.

---

### ✅ Optional: Add a Version Tag

```bash
docker tag my-app dpvasani56/node-application:v1
```

🎯 This is better for **version control** in CI/CD and releases.

---

### 🔐 Step 2: Login to Docker Hub

```bash
docker login
```

➡️ Enter Docker Hub credentials for **`dpvasani56`**.

---

### 📤 Step 3: Push the Image

#### 👉 With version tag:

```bash
docker push dpvasani56/node-application:v1
```

#### 👉 Or default (`latest` tag):

```bash
docker push dpvasani56/node-application
```

✅ Image now available at:
🔗 [https://hub.docker.com/r/dpvasani56/node-application](https://hub.docker.com/r/dpvasani56/node-application)

---

### 📥 Step 4: Pull & Use It Anywhere

```bash
docker pull dpvasani56/node-application:v1
```

Run the app:

```bash
docker run -p 3000:3000 dpvasani56/node-application:v1
```

---

## 📦 All Commands Recap

```bash
# 🔨 Build your image
docker build -t my-app .

# 🏷️ Tag for Docker Hub
docker tag my-app dpvasani56/node-application:v1

# 🔐 Login to Docker Hub
docker login

# 📤 Push to Docker Hub
docker push dpvasani56/node-application:v1

# 📥 Pull from Docker Hub (anywhere)
docker pull dpvasani56/node-application:v1

# ▶️ Run it
docker run -p 3000:3000 dpvasani56/node-application:v1
```

---

## 🧠 Helpful Tips

| Command              | Use                            |
| -------------------- | ------------------------------ |
| `docker images`      | View tagged images locally 🗂️ |
| `docker rmi <image>` | Remove an image locally 🧹     |
| `docker ps`          | View running containers 🚀     |
| `docker stop <id>`   | Stop a container manually 🛑   |

---

