FROM python:3.9-buster
WORKDIR /app
COPY requirements.txt ./
RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5002
ENTRYPOINT [ "python" ]
CMD [ "app.py" ]
