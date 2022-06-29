# # start by pulling the python image
# FROM python:3.9-buster
# WORKDIR /app
# RUN apt-get update && apt-get install -y \
#     gcc
# RUN /usr/local/bin/python -m pip install --upgrade pip
# COPY requirements.txt ./
# RUN pip install -r requirements.txt
# COPY . .
# EXPOSE 5002
# CMD ["python", "./inference.py" ]

# FROM python:3.9-buster
# RUN apt-get update && apt-get install -y \
#     gcc
# RUN /usr/local/bin/python -m pip install --upgrade pip
# COPY requirements.txt .
# RUN pip3 install -r requirements.txt
# COPY . .
# WORKDIR /app
# CMD ["flask", "run"]


FROM python:3.9-buster
RUN apt-get update && apt-get install -y \
    gcc
RUN python -m pip install --upgrade pip
WORKDIR /app
COPY . /app
RUN pip3 install -r ./requirements.txt
EXPOSE 5002
CMD ["python", "-m", "flask", "run"]
