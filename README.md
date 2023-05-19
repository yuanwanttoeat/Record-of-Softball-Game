# 棒壘球比賽紀錄系統
<img src="https://img.shields.io/badge/MADE_WITH-%E2%9D%A4_FOR_BASEBALL-red?style=for-the-badge">

簡單的~~純~~前端網頁，用來記錄棒壘球比賽的紀錄，並且可以將紀錄匯出成 CSV 檔案。

目前改為使用 Golang 開發 backend。

## 使用方法
### 本機執行
1. `$ go run backend/server.go`，若沒裝請參考 Go install 流程
2. `$ python -m http.server --directory frontend`
3. 打開此網站 (http://localhost:8080)
4. 輸入每一個 play
5. 按下 Export 來匯出結果

注意：資料存在 cookie 裡面，所以在記錄過程中請不要刪除 cookie。

### 使用 docker
1. `$ docker-compose up -d`
2. 打開網站 (http://localhost:80)

## Go install
- Check go version:

```
go version
```

- If another version of Go is installed, remove the existing version and install Go 1.17.8:

```
sudo rm -rf /usr/local/go
wget https://dl.google.com/go/go1.17.8.linux-amd64.tar.gz
sudo tar -C /usr/local -zxvf go1.17.8.linux-amd64.tar.gz
```

- If Go is not installed on your system:

```
 wget https://dl.google.com/go/go1.17.8.linux-amd64.tar.gz
 sudo tar -C /usr/local -zxvf go1.17.8.linux-amd64.tar.gz
 mkdir -p ~/go/{bin,pkg,src}
 # The following assume that your shell is bash
 echo 'export GOPATH=$HOME/go' >> ~/.bashrc
 echo 'export GOROOT=/usr/local/go' >> ~/.bashrc
 echo 'export PATH=$PATH:$GOPATH/bin:$GOROOT/bin' >> ~/.bashrc
 echo 'export GO111MODULE=auto' >> ~/.bashrc
 source ~/.bashrc
```
