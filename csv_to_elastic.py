#!/usr/bin/env python3
# This script is disgusting, but it sort of gets the job done.
import argparse
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
    raw = infile.read()
data = raw.strip().splitlines()
header = data[0]
lines = data[1:]
print(f"{len(lines)} lines")
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

# TODO: fixup date fields to elastic-friendly format
to_push = [{k.strip(): v.strip() for k, v in zip(keys, line.split(sep))} for line in lines]
helpers.bulk(es, to_push, index=args.index)
print("Finished")
