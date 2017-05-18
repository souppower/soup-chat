#!/bin/bash -Ceu

cd `dirname $0`

go get -u github.com/golang/lint/golint
golint $(glide novendor)
go vet $(glide novendor)
go test --cover -v $(glide novendor)