
This project based on [django-clean-template](https://github.com/alexey-goloburdin/django-clean-template) from [Alexey Goloburdin](https://github.com/alexey-goloburdin). This site includes configs for Systemd, nginx, gunicorn.

To install this project execute script, provide path to Python interpreter (`Based on 3.7`) and enter domain name:

```bash
./install.sh
```

Also inside Django config you can change database settings (`src/config/settings.py`). ( By default it's using SQLite)

To check gunicorn daemon status:

```bash
sudo systemctl status gunicorn
```

Gunicorn's logs located at `gunicorn/access.log` and `gunicorn/error.log`.

It is also recommended to increase amount of workers in (`systemd/gunicorn.service`) and add SSL certificate (`Let's Encrypt` will be ok) if your sever will serve a large number of users.

After changing systemd config you need to reload daemon and restart service:

```bash
sudo systemctl daemon-reload
sudo systemctl restart gunicorn
```
