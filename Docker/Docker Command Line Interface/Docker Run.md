## 🔍 **What happens when you run `docker run ubuntu`?**

1. **Check for the Image Locally**:
   Docker first checks if the `ubuntu` image exists on your local machine.

   * If **not found**, Docker will **pull** the latest Ubuntu image from [Docker Hub](https://hub.docker.com/_/ubuntu) (official registry).
   * If **found**, it skips pulling and uses the local version.

2. **Create and Start a Container**:
   Docker creates a new **container instance** from the Ubuntu image and **runs the default command**.

   * The **default command** in the Ubuntu image is usually:

     ```
     CMD ["bash"]
     ```
   * But since you didn't pass `-it`, **you won't see an interactive shell**, and the container will likely **exit immediately** because there's nothing to keep it running.

---

## 🧠 So why does it exit immediately?

* Containers need a **foreground process** (like a shell or server).
* Without `-it`, the container runs `bash`, but since no input/output is attached, it just runs and **exits right away**.

---

## ✅ The Role of `-it` (Very Important!)

Here's what happens when you run:

```
docker run -it ubuntu
```

### 🧩 Breaking down `-it`:

| Flag | Full Form     | What it does                                                                                      |
| ---- | ------------- | ------------------------------------------------------------------------------------------------- |
| `-i` | --interactive | Keeps STDIN open, so you can **send input** (like typing into a shell).                           |
| `-t` | --tty         | Allocates a pseudo-TTY (like a terminal), so the output looks **human-readable** and interactive. |

🌀 **Together, `-it` means**:

* You get an **interactive terminal session** inside the container.
* It **attaches your keyboard and screen** to the container’s terminal.

### ✅ Example with `-it`:

```bash
docker run -it ubuntu
```

* This will:

  * Pull Ubuntu image if not already present.
  * Create a container.
  * Run the default shell (`bash`) in interactive mode.
  * Give you a terminal prompt like:

    ```
    root@a1b2c3d4e5:/#
    ```

---

## 🧪 You can also run specific commands:

```bash
docker run -it ubuntu bash
```

* Explicitly tells Docker to run `bash` shell interactively.
* Useful if you want to ensure you're in a shell and not relying on image defaults.

---

## 🛠 Other Common `docker run` Flags:

| Flag     | Purpose                                                |
| -------- | ------------------------------------------------------ |
| `--rm`   | Automatically remove the container when it exits.      |
| `-d`     | Run container in detached mode (in the background).    |
| `-p`     | Publish container port to host (e.g., `-p 8080:80`).   |
| `--name` | Give the container a specific name.                    |
| `-v`     | Mount volumes (e.g., `-v /host/path:/container/path`). |

---

## 📦 Summary:

| Command                           | What it does                                                              |
| --------------------------------- | ------------------------------------------------------------------------- |
| `docker run ubuntu`               | Runs Ubuntu container with default CMD, but exits immediately (no `-it`). |
| `docker run -it ubuntu`           | Launches Ubuntu in an interactive terminal (`bash`).                      |
| `docker run -it ubuntu bash`      | Explicitly runs `bash` interactively.                                     |
| `docker run -it --rm ubuntu bash` | Interactive session that cleans up the container after exit.              |

---

Want to try it?

```bash
docker run -it ubuntu bash
```

Then type `ls`, `pwd`, `apt update` etc. — you're inside a real Linux container now! 🐳💻
