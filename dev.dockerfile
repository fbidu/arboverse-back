FROM python:3
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY requirements/ /code/requirements
RUN pip install -r requirements/local.txt
COPY env.docker .env