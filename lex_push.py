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

    run("black . || echo 'black not installed'")
    run("isort . || echo 'isort not installed'")

    run("git add .")
    timestamp = datetime.now().strftime("%Y-%m-%d %I:%M %p")
    commit_msg = f"🔄 Auto-update: {timestamp}"
    run(f'git commit -m "{commit_msg}" || echo No changes to commit')

    print("🚀 Pushing to origin...")
    run("git push origin main")

    print("🚀 Pushing to lexlocal...")
    run("git push lexlocal main")

    run("bash codex_tools/auto_update.sh || echo 'No codex_tools hook found'")
    print("✅ Dual push complete.")

if __name__ == "__main__":
    main()
