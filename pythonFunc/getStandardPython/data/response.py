import json
from .text import Text

class Response:
    def __init__(self):
        self._title = ""
        self._language = ""
        self._plan = ""
        self._chapter = 0
        self._side = 0
        self._picture_url = ""
        self._picture_pos = ""
        self._text = []
        

    @property
    def title(self) -> str:
        return self._title

    @property
    def language(self) -> str:
        return self._language

    @property
    def plan(self) -> str:
        return self._plan

    @property
    def chapter(self) -> int:
        return self._chapter

    @property
    def side(self) -> int:
        return self._side

    @property
    def picture_url(self) -> str:
        return self._picture_url

    @property
    def picture_pos(self) -> str:
        return self._picture_pos

    @property
    def text(self) -> list:
        return self._text

    @title.setter
    def title(self, title: str):
        self._title = title

    @language.setter
    def language(self, language: str):
        self._language = language

    @plan.setter
    def plan(self, plan: str):
        self._plan = plan

    @chapter.setter
    def chapter(self, chapter: str):
        self._chapter = chapter

    @side.setter
    def side(self, side: str):
        self._side = side

    @picture_url.setter
    def picture_url(self, picture_url: str):
        self._picture_url = picture_url

    @picture_pos.setter
    def picture_pos(self, picture_pos: str):
        self._picture_pos = picture_pos

    @text.setter
    def text(self, text: list):
        self._text = text


    def __str__(self):
        return f"Titel: {self._title}\n" + \
               f"Programmiersprache: {self._language}\n" + \
               f"Plan: {self._plan }\n" + \
               f"Kapitel: {self._chapter }\n" + \
               f"Seite: {self._side}\n" + \
               f"Bild-Url: {self._picture_url}\n" + \
               f"Bild-Position: {self._picture_pos}\n" + \
               f"Text: {self._text}"


    def to_json(self) -> str:
        """Serialisieren des Response-Objektes als JSON-Objekt

        Returns:
            str: Response-Objekt im JSON-Format
        """

        text_list = []

        for ele in self._text:
            if isinstance(ele, Text):
                curr_dict = {"text" : ele.text, "type" : ele.type}
                text_list.append(curr_dict)

        data_dict = {
            "title": self._title,
            "language": self._language,
            "plan": self._plan,
            "chapter": self._chapter,
            "side" : self._side,
            "pictureUrl" : self._picture_url,
            "picturePos": self._picture_pos,
            "text": text_list
        }

        return json.dumps(data_dict, indent=4)
        

    
    