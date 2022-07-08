#!/bin/bash

. bin/linux/env.sh

echo "Configuring database: $PGDATABASE..."

dropdb -U $PGUSER $PGDATABASE
createdb -U $PGUSER $PGDATABASE
psql -U  $PGUSER $PGDATABASE < ./data/dumpdb.sql

echo "$PGDATABASE configured sucessefully"
echo "Now, run npm install and npm start"