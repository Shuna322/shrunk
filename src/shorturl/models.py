from django.db import models
from .utils import random_string_generator

# Create your models here.
class Redirect(models.Model):
    redirect_uuid = models.SlugField(max_length=6, unique=True, default=random_string_generator( size = 6 ))
    redirect_link = models.URLField(max_length=1000)