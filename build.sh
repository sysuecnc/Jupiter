#!/bin/bash

for file in `find . -type f -iname "*.less"`
do
    lessc ${file} ${file/.less/.css};
done
