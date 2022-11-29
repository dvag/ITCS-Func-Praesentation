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
    
    response.title = "Hands On: Function Definition"
    response.language = "Python 3"
    response.plan = "Standard Plan"
    response.chapter = "1"
    response.side = "1"
    response.picture_url = "https://stfuncitcsgolanent01.blob.core.windows.net/bilder/functionJosn.PNG"
    response.picture_pos = "left"
    response.text = [
        Text(text="Befehl Func New (Azure Core Tools) wird neue Function angelegt", type="main"), 
        Text(text="function.json konfiguriert z.B.:", type="main"), 
        Text(text="Authentifizierung", type="bullet"),
        Text(text="Routing", type="bullet"), 
        Text(text="Verfügbare HTTP Methoden", type="bullet"),
        Text(text="Anbindung an Azure Ressourcen (Tables, Queues, etc.)", type="bullet")
        ]

    return response
