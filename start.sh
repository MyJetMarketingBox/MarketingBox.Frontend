#!/bin/bash

if [ -s env/.env ]; then
    ln -sf env/.env .env
fi
npm start
