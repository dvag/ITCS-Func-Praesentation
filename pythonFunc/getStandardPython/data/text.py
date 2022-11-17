class Text:
    def __init__(self, text:str, type: str):
        self._text = text
        self._type = type

    @property
    def text(self) -> str:
        return self._text

    @property
    def type(self) -> str:
        return self._type

    @text.setter
    def text(self, text: str):
        self._text = text

    @type.setter
    def type(self, type: str):
        self._type = type

    def __str__(self):
        return f"Text: {self._text}\n Type:{self._type}"
