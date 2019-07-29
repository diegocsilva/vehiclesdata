#!/usr/bin/env bash
cd back-end/vehiclesdata 
mvn clean install -DskipTests
cd ../../front-end
ng -v
npm install && ng build --prod