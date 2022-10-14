package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
)

type PresResponse struct {
	Title      string      `json:"title"`
	Language   string      `json:"language"`
	Plan       string      `json:"plan"`
	Chapter    int         `json:"chapter"`
	Side       int         `json:"Side"`
	PictureUrl string      `json:"pictureUrl"`
	PicturePos string      `json:"picturePos"`
	Text       []TextPoint `json:"text"`
}

type TextPoint struct {
	Text string `json:"text"`
	Type string `json:"type"`
}

func main() {
	runAPi()
}

func getStandardGo(w http.ResponseWriter, r *http.Request) {
	fmt.Print("Hit Endpoint getStandardGo")
	res := PresResponse{
		Title:      "TestTitle",
		Language:   "Go",
		Plan:       "Standard",
		Chapter:    1,
		Side:       1,
		PictureUrl: "https://www.evkircheschaafheim.de/wp-content/uploads/2014/09/Dummybild.jpg",
		PicturePos: "left",
		Text: []TextPoint{
			{
				Text: "FirstText",
				Type: "main",
			},
			{
				Text: "FirstText",
				Type: "bullet",
			},
		},
	}

	json.NewEncoder(w).Encode(res)

}

func getPremiumGo(w http.ResponseWriter, r *http.Request) {
	fmt.Print("Hit Endpoint getPremiumGo")
	res := PresResponse{
		Title:      "TestTitle",
		Language:   "Go",
		Plan:       "Premium",
		Chapter:    1,
		Side:       1,
		PictureUrl: "https://www.evkircheschaafheim.de/wp-content/uploads/2014/09/Dummybild.jpg",
		PicturePos: "left",
		Text: []TextPoint{
			{
				Text: "FirstText",
				Type: "main",
			},
			{
				Text: "FirstText",
				Type: "bullet",
			},
		},
	}
	json.NewEncoder(w).Encode(res)
}

func kill(w http.ResponseWriter, r *http.Request) {
	os.Exit(3)
}

func runAPi() {
	fmt.Printf("Welcome! Available Enpoints are:")
	fmt.Println("/api/getStandardGo")
	fmt.Println("/api/getPremiumGo")
	fmt.Println("/api/kill")
	listenAddr := ":8081"
	if val, ok := os.LookupEnv("FUNCTIONS_CUSTOMHANDLER_PORT"); ok { // ok will receive a bool that will be set to true if "FUNCTIONS_CUSTOMHANDLER_PORT" was actually present in LookUpEnv
		listenAddr = ":" + val

	}
	srv := http.NewServeMux()
	srv.HandleFunc("/api/getStandardGo", getStandardGo)
	srv.HandleFunc("/api/getPremiumGo", getPremiumGo)
	srv.HandleFunc("/api/kill", kill)
	log.Fatal(http.ListenAndServe(listenAddr, srv))
}
