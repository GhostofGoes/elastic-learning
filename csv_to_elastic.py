#!/usr/bin/env python3
# This script is disgusting, but it sort of gets the job done.
import argparse
import csv
import re

from elasticsearch import helpers, Elasticsearch


parser = argparse.ArgumentParser()
parser.add_argument("filename")
parser.add_argument("--index")
parser.add_argument("--host", default="localhost")
parser.add_argument("--port", default=9200)
parser.add_argument("--encoding", default="utf-8")
args = parser.parse_args()

es = Elasticsearch(args.host, port=args.port)

with open(args.filename, encoding=args.encoding) as infile:
    # raw = infile.read()
    header = infile.read().strip().splitlines()[0]
#data = raw.strip().splitlines()
#header = data[0]
#lines = data[1:]
#print(f"{len(lines)} lines")
# TODO: just extract keys from csv.DictReader, then clean them up and rebuild the dict.
if "\t" in header:
    sep = "\t"
else:
    sep = ","
keys = header.split(sep)
keys = [re.sub(r"\s{2,}", "", x) for x in keys]
keys = [x.lower().replace(" ", "_").replace("-", "").strip() for x in keys]
keys = [re.sub(r"[_]{2,}", "_", x) for x in keys]
keys = [x.replace("\ufeff", "") for x in keys]
print(f"Keys: {keys}")

# TODO: fixup date/timestamp values to elastic-friendly format
# TODO: add "@timestamp" field
to_push = []
with open(args.filename, encoding=args.encoding) as infile:
    reader = csv.DictReader(infile) # , delimiter=sep)
    for line in reader:
        item = {}
        for key, value in zip(keys, line.values()):
            item[key] = value
        to_push.append(item)
print(f"{len(to_push)} lines")
# to_push = [{k.strip(): v.strip() for k, v in zip(keys, line.split(sep))} for line in lines]
helpers.bulk(es, to_push, index=args.index)
print("Finished")
