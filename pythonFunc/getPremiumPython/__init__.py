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
    
    response.title = "Teaser Python"
    response.language = "Python 3"
    response.plan = "Premium Plan"
    response.chapter = "1"
    response.side = "1"
    response.picture_url = "https://www.jeffsblog.at/wp-content/uploads/2019/01/5-Windows-95-wallpaper.jpg"
    response.picture_pos = "left"
    response.text = [
        Text(text="Dies ist Text Nr 1", type="main"), 
        Text(text="Dies ist Text Nr 2", type="bullet"),
        Text(text="Dies ist Text Nr 3", type="bullet")
        ]

    return response
