import random
import string
from django.utils.text import slugify



def random_string_generator(size=15, chars=string.ascii_lowercase + string.digits + string.ascii_uppercase + "-_"):
    return ''.join(random.choice(chars) for _ in range(size))