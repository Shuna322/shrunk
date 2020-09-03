from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.core.exceptions import ObjectDoesNotExist

from .models import Redirect

import json

def index(request):
    return render(request, "index.html", {})

def redirect_user(request, slug):
    try:
        url = Redirect.objects.get(redirect_uuid=slug).redirect_link
        return redirect(url)
    except ObjectDoesNotExist as e:
        url = e.__str__
        return render(request, "index.html", {"error": url})

def get_link(request):
    BLACKLIST_SLUG = ["admin"]
    if request.body and "application/json" in request.headers.get("Content-Type"):
        body = json.loads(request.body.decode('utf-8'))
        destination_url = body.get("url", "")
        try:
            existing_entry = Redirect.objects.get(redirect_link=destination_url)
            body["slug"] = existing_entry.redirect_uuid
            body["status"] = "Success"

            return JsonResponse(body)

        except ObjectDoesNotExist as e:
            new_entry = Redirect(redirect_link=destination_url)
            new_entry.save()
            body["slug"] = new_entry.redirect_uuid
            body["status"] = "Success"

            return JsonResponse(body)
    else:
        body = {
            "status": "Error",
            "message": "What are you trying to do here ? :)"
        }
        return JsonResponse(body)

def unknown_path(request):
    return render(request, "index.html", {"error": "Unknown request, please check URL and try again."})