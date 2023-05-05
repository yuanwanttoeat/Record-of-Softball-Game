package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.LoadHTMLGlob("template/*")
	router.Static("/asset", "./asset")
	router.GET("/ping", ping)
	router.GET("/RecordPage", getRecordPage)

	router.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")

}

func ping(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}

func getRecordPage(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", nil)
}
