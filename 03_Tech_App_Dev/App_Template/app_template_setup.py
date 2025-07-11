# LacyCom1 Action: Create Universal App Template for Perspective Apps

# Directory: Perspective/03_Tech_App_Dev/App_Template
# Purpose: Optimize repeatability, reduce time spent scaffolding, align with Codex automation

import os

TEMPLATE_STRUCTURE = [
    "app/routes",
    "app/utils",
    "scripts",
    "tests",
    "codex_tools"
]

TEMPLATE_FILES = {
    "README.md": """# \ud83d\udce6 Universal App Template
This is the base template used for all Lex-aligned apps in the Perspective system.
""",
    ".env.template": """# \ud83d\udee0 .env Template for New Apps
EXAMPLE_ENV_VAR=value
""",
    "requirements.txt": """fastapi
uvicorn
aiohttp
python-dotenv
pytest
black
isort
""",
    "scripts/start_dev.sh": """#!/bin/bash
uvicorn app.main:app --reload
""",
    "scripts/deploy.sh": """#!/bin/bash
echo 'Deploy logic here...'
""",
    "app/main.py": """from fastapi import FastAPI
app = FastAPI()

@app.get('/')
def root():
    return {'message': 'Template Initialized'}
""",
    "tests/test_base.py": """def test_placeholder():
    assert True
""",
    "codex_tools/auto_update.sh": """#!/bin/bash
echo '\ud83d\udd04 Updating Project Tree (mock)'
"""
}

def setup_template():
    base_path = os.path.join("Perspective", "03_Tech_App_Dev", "WheelMate")
    os.makedirs(base_path, exist_ok=True)
    
    for folder in TEMPLATE_STRUCTURE:
        path = os.path.join(base_path, folder)
        os.makedirs(path, exist_ok=True)

    for rel_path, content in TEMPLATE_FILES.items():
        file_path = os.path.join(base_path, rel_path)
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, "w") as f:
            f.write(content)

if __name__ == "__main__":
    setup_template()
    print("\u2705 WheelMate Template Initialized under Perspective/03_Tech_App_Dev/WheelMate")
