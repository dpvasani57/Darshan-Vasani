# ✅ Use a specific minimal Node.js version with Alpine
FROM node:20-alpine AS base

# 🧼 Create a non-root user for better security
RUN addgroup app && adduser -S -G app app

# 📁 Set working directory
WORKDIR /app

# 🔒 Use only package.json and lock file for better cache management
COPY package*.json ./

# 📦 Install dependencies (in a separate layer to improve caching)
RUN npm ci --omit=dev

# 🧍 Switch to non-root user
USER app

# 📁 Copy application code after installing deps to optimize Docker caching
COPY --chown=app:app . .

# 🌍 Set environment variable
ENV PORT=8000

# 🚪 Expose the app port
EXPOSE 8000

# 🚀 Start the app
CMD ["node", "index.js"]
