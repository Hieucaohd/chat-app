#!/bin/bash

shopt -s extglob
cd /home/ubuntu/chatApp/
rm -v !("node_modules")
rm -R !("node_modules")
shopt -u extglob
