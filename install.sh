#!/bin/bash
base_python_interpreter=""
project_domain=""
project_path=`pwd`


sudo apt-get update
sudo apt-get install python3.8 python3-pip python3-venv nginx python3-certbot-nginx

read -p "Python interpreter: " base_python_interpreter
read -p "Your domain without protocol (for example, google.com): " project_domain
`$base_python_interpreter -m venv env`
source env/bin/activate
pip install -U pip
pip install -r requirements.txt

sed -i "s~dbms_template_path~$project_path~g" nginx/site.conf systemd/gunicorn.service
sed -i "s~dbms_template_domain~$project_domain~g" nginx/site.conf src/config/settings.py

sudo ln -s $project_path/nginx/site.conf /etc/nginx/sites-enabled/
sudo ln -s $project_path/systemd/gunicorn.service /etc/systemd/system/

python src/manage.py migrate
python src/manage.py makemigrations shorturl
python src/manage.py sqlmigrate shorturl 0001
python src/manage.py migrate

sudo systemctl daemon-reload
sudo systemctl start gunicorn
sudo systemctl enable gunicorn
sudo service nginx restart

sudo certbot --nginx -d $project_domain
