package com.itcs;


public class Response {
    private String title;
    private String language;
    private String plan;
    private int chapter;
    private int side;
    private String pictureUrl;
    private String picturePos;
    private Text[] text;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getPlan() {
        return plan;
    }

    public void setPlan(String plan) {
        this.plan = plan;
    }

    public int getChapter() {
        return chapter;
    }

    public void setChapter(int chapter) {
        this.chapter = chapter;
    }

    public int getSide() {
        return side;
    }

    public void setSide(int side) {
        this.side = side;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public String getPicturePos() {
        return picturePos;
    }

    public void setPicturePos(String picturePos) {
        this.picturePos = picturePos;
    }

    public Text[] getText() {
        return text;
    }

    public void setText(Text[] text) {
        this.text = text;
    }
}