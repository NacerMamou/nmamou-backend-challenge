call env.bat
echo "Configuring database: $PGDATABASE..."

dropdb -U %PGUSER% %PGDATABASE%
createdb -U %PGUSER% %PGDATABASE%
psql -U  %PGUSER% %PGDATABASE% < ../../data/dumpdb.sql

echo "$PGDATABASE configured sucessefully"