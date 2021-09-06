My personal notes and scripts while studying for the Elasticsearch Certified Engineer certification exam.

I'm working on Windows 10 in PowerShell, YMMV.

# Setup
Requirements
- Docker Desktop (on a local machine) OR docker+docker-compose installed on a server
- Python 3.6+ (I've been using 3.7)
- elasticsearch-py (`pip install elasticsearch`)
- curl (`scoop install curl`)

## Cluster setup
```bash
docker-compose up -d
docker-compose logs -f
```

## Ingesting data
Download Chicago data: https://catalog.data.gov/dataset/crimes-2001-to-present

```powershell
curl -XPUT "localhost:9200/shakespeare?pretty" -H "Content-Type: application/json" --data-binary "@shakespeare-index.json"
curl -XPOST "localhost:9200/_bulk" -H "Content-Type: application/x-ndjson" --data-binary "@shakespeare_dataset.json"

curl -XPUT "localhost:9200/abq-travel-data?pretty" -H "Content-Type: application/json" --data-binary "@abq-travel-data-index.json"
py -3.7 .\csv_to_elastic.py --index abq-travel-data --encoding utf-16-le .\TravelSept2015toPresent-en-us.csv

curl -XPUT "localhost:9200/chicago-crimes?pretty" -H "Content-Type: application/json" --data-binary "@chicago-crimes-index.json"
py -3.7 .\csv_to_elastic.py --index chicago-crimes ..\Crimes_-_2001_to_Present.csv
```


# Attributions
- Guido Lena Cota (@glenacota) (https://github.com/glenacota/elastic-training-repo): used his Docker Compose files as a template for this project, as well as the Shakespeare dataset.
- City of Albuquerque's ABQ Data project: https://www.cabq.gov/abq-data/
- City of Chicago's datasets
