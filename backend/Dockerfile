FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh
CMD ["./start.sh"]