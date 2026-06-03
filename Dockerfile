FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8080

ENV PORT=8080
ENV HOST=0.0.0.0

CMD exec gunicorn --bind $HOST:$PORT --workers 1 app:app