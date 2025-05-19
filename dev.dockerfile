FROM python:3.13
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY requirements/ /code/requirements
# RUN pip install --upgrade pip
RUN pip install -r requirements/requirements.txt
