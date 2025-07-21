#!/usr/bin/env python3
import subprocess
from datetime import datetime

def run(command):
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    if result.stdout:
        print(result.stdout.strip())
    if result.stderr:
        print(result.stderr.strip())

def main():
    print("🔄 Lex Push: Starting auto-commit sequence...")

    # Format, sort, and prepare repo
    run("black .")
    run("isort .")

    # Stage all changes
    run("git add .")

    # Commit with datetime tag
    timestamp = datetime.now().strftime("%Y-%m-%d %I:%M %p")
    commit_msg = f"🔄 Auto-update: {timestamp}"
    run(f'git commit -m "{commit_msg}"')

    # Push to main
    run("git push origin main")

    # Optional post-push hook
    run("bash codex_tools/auto_update.sh || echo 'No codex_tools hook found.'")

    print("✅ Lex Push Complete.")

if __name__ == "__main__":
    main()
