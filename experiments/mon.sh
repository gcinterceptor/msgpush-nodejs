#!/bin/bash
echo "ts,load"
while true;
do
	ts=`printf '%(%s)T\n' -1`
	load=`top -b -n 1 | awk 'NR > 7 { sum += $9 } END { print sum }'`
	echo "${ts},${load}"
	sleep 1
done
