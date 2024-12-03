if test -d ./migrations; then
  rm -r ./migrations
fi
flask db init
flask db migrate -m "Initial migration."
flask db upgrade
