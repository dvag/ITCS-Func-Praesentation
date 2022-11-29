import logging
import json

import azure.functions as func
from .data.response import Response
from .data.text import Text


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    #return func.HttpResponse(f"Dies ist eine Testausgabe von Azure Functions in Python - Standard Plan.")
    teaser_response = create_teaser_response()
    return func.HttpResponse(teaser_response.to_json())


def create_teaser_response() -> Response:
    """Erstellen der Teaser-Response

    Returns:
        Response: Zurückgeben des erstellten Response-Objektes
    """
    response = Response()
    
    response.title = "Anwendungsbereiche"
    response.language = "Python 3"
    response.plan = "Standard Plan"
    response.chapter = "1"
    response.side = "1"
    response.picture_url = ""
    response.picture_pos = "left"
    response.text = [
        Text(text="Consumption Plan", type="main"), 
        Text(text="nicht zeitkritischer Anwendungen", type="bullet"), 
        Text(text="Kaltstart verzögert Antwortzeiten", type="bullet"),
        Text(text="sporadisch genutzte Anwendungen", type="bullet"), 
        Text(text="Anwendungen mit großen Intervallen", type="bullet"),
        Text(text="Premium Plan", type="main"),
        Text(text="Zeitkritische Anwendungen", type="bullet"),
        Text(text="Programmiersprachen mit großen Binarys", type="bullet")
        ]

    return response
