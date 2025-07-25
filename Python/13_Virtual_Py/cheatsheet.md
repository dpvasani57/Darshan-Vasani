# 🐍 Python Virtual Environment Cheatsheet

---

## 🆕 Create a New Virtual Environment

```bash
python -m venv env_name
```

🔹 This creates a new folder named `env_name` containing an isolated Python environment.

---

## ✅ Activate the Environment

### 🪟 On **Windows**:

```bash
.\env_name\Scripts\activate
```

### 🐧 On **Linux/macOS**:

```bash
source env_name/bin/activate
```

🔔 Once activated, your terminal prompt will show the environment name, like:

```bash
(env_name) PS C:\your_path>
```

---

## 📦 Install Python Packages

```bash
pip install package_name
```

➡️ Installs packages **only inside** the virtual environment.

---

## 📝 Save Installed Packages to a File

```bash
pip freeze > requirements.txt
```

📂 Creates a `requirements.txt` file listing all installed versions.

> Alternate:

```bash
pip list --format=freeze > requirements.txt
```

---

## 📥 Install from Requirements File

```bash
pip install -r requirements.txt
```

📦 Restores the environment with exact versions listed.

---

## ❌ Deactivate the Virtual Environment

```bash
deactivate
```

🧹 This returns you to the system’s global Python environment.

---

## 🔁 Bonus Tips

* 🧪 Check Python version inside environment:

  ```bash
  python --version
  ```

* 🔍 Check installed packages:

  ```bash
  pip list
  ```

* 🗑 To remove the virtual environment:
  Just delete the folder:

  ```bash
  rm -rf env_name  # Linux/macOS
  rmdir /s env_name  # Windows (PowerShell)
  ```

---
