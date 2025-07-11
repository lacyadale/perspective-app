# infra/docker/backend.Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Copy project files into the image
COPY .. .

# Install minimal runtime dependencies
RUN pip install --no-cache-dir \
        fastapi uvicorn sqlmodel psycopg2-binary pandas pydantic PyYAML

EXPOSE 8000

# Launch the API; remove --reload in production
CMD ["uvicorn", "apps.api.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
