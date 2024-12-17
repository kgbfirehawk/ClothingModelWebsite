#!/bin/bash

# Get the directory of the script
SCRIPT_DIR=$(dirname $(realpath $0))

# Start frontend
gnome-terminal -- bash -c "cd $SCRIPT_DIR/../frontend && npm start; exec bash"

# Start auth-service
gnome-terminal -- bash -c "cd $SCRIPT_DIR/../auth-service && npm start; exec bash"

# Start profile-service
gnome-terminal -- bash -c "cd $SCRIPT_DIR/../profile-service && npm start; exec bash"

# Start model-service
gnome-terminal -- bash -c "cd $SCRIPT_DIR/../model-service && npm start; exec bash"

# Start sharing-service
gnome-terminal -- bash -c "cd $SCRIPT_DIR/../sharing-service && npm start; exec bash"

# Start currency-converter service
gnome-terminal -- bash -c "cd $SCRIPT_DIR/../currency-converter && python3 currency_converter.py; exec bash"