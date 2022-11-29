import logging
import json

import azure.functions as func
from .data.response import Response
from .data.text import Text


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    #return func.HttpResponse(f"Dies ist eine Testausgabe von Azure Functions in Python - Premium Plan.")
    teaser_response = create_teaser_response()
    return func.HttpResponse(teaser_response.to_json())


def create_teaser_response() -> Response:
    """Erstellen der Teaser-Response

    Returns:
        Response: Zurückgeben des erstellten Response-Objektes
    """
    response = Response()
    
    response.title = "Nachteile"
    response.language = "Python 3"
    response.plan = "Premium Plan"
    response.chapter = "1"
    response.side = "1"
    response.picture_url = ""
    response.picture_pos = "left"
    response.text = [
        Text(text="Allgemein", type="main"), 
        Text(text="Laufzeit begrenzt auf fünf Minuten", type="bullet"),
        Text(text="Ein Deploymentslot pro Ressourcengruppe", type="bullet"),
        Text(text="Consumption Plan", type="main"), 
        Text(text="Function wird nach einer gewissen Zeit abgeschaltet (Kaltstartzeit)", type="bullet"),
        Text(text="Premium Plan", type="main"),
        Text(text="Sehr viel teurer als Consumption Plan", type="bullet")
        ]

    return response
