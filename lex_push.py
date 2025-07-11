# lex_push.py
import os
import subprocess
import sys
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
GITHUB_PAT = os.getenv("GITHUB_PAT")

if not GITHUB_PAT:
    print("❌ GitHub token not found in .env")
    sys.exit(1)

REPO_URL = "https://github.com/lacyadale/perspective-app.git"
REMOTE_NAME = "origin"
BRANCH_NAME = "main"

# Git setup
subprocess.run(["git", "init"])
subprocess.run(["git", "remote", "remove", REMOTE_NAME], stderr=subprocess.DEVNULL)
subprocess.run(["git", "remote", "add", REMOTE_NAME, f"https://{GITHUB_PAT}@github.com/lacyadale/perspective-app.git"])
subprocess.run(["git", "checkout", "-B", BRANCH_NAME])

# Stage all changes
subprocess.run(["git", "add", "."])

# Commit with Lex format
timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
commit_message = f"🔄 Lex auto-push: {timestamp} snapshot"
subprocess.run(["git", "commit", "-m", commit_message])

# Push
subprocess.run(["git", "push", "-u", REMOTE_NAME, BRANCH_NAME])

# Optional: auto-doc snapshot
if os.path.exists("codex_tools/auto_update.sh"):
    subprocess.run(["bash", "codex_tools/auto_update.sh"])

print("✅ Lex push completed.")
