#!/bin/bash
for i in {1..10000}
do
	now=$(date +%FT%TZ)
	myCmd=$(printf "echo '{\"name\":\"Survey 1\",\"ts\":\"%s\",\"gps\":{\"lat\":%s,\"lng\":%s},\"acc\":%s,\"conn\":true,\"eventStatus\":false,\"event\":{}}\n' > /dev/rfcomm0" $now $((1 + RANDOM % 1000)) $((1 + RANDOM % 1000)) $((1 + RANDOM % 1000)))
	eval $myCmd
	echo $myCmd
	sleep 1
done
