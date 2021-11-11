My personal notes and scripts while studying for the Elasticsearch Certified Engineer certification exam.

I'm working on Windows 10 in PowerShell, your mileage may vary.

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
NOTE: the quotation marks on the filenames provided to `--data-binary` are important if you are in PowerShell. They don't matter on Linux.
### Elastic's sample datasets (recommended)
On the homepage of Kibana, click "Try our sample data" (positioned to the right of "Ingest your data"). Then, click "Add data" on all available datasets. For me on Elastic 7.14, there were 3: Sample eCommerce orders, Sample flight data, and Sample web logs.

### Shakespeare's plays (recommended) (from @glenacota)
```shell
curl -XPUT "localhost:9200/shakespeare?pretty" -H "Content-Type: application/json" --data-binary "@shakespeare-index.json"
curl -XPOST "localhost:9200/_bulk" -H "Content-Type: application/x-ndjson" --data-binary "@shakespeare_dataset.json"
```

### Albuquerque travel data
This dataset is a little dirty still.

```powershell
curl -XPUT "localhost:9200/abq-travel-data?pretty" -H "Content-Type: application/json" --data-binary "@abq-travel-data-index.json"
py -3.7 .\csv_to_elastic.py --index abq-travel-data --encoding utf-16-le TravelSept2015toPresent-en-us.csv
```

### Chicago crime data
1. Download Chicago data: https://catalog.data.gov/dataset/crimes-2001-to-present
1. Run the following commands:
    ```powershell
    curl -XPUT "localhost:9200/chicago-crimes?pretty" -H "Content-Type: application/json" --data-binary "@chicago-crimes-index.json"
    # NOTE: this will take a while, ~20 minutes to an hour, depending on the speed of your system.
    # It will also take up a significant amount of memory. I recommend ONLY running if you have at least 16GB of RAM in your system. It can probably be done better, I'm just lazy and focused on studying for the exam.
    py -3.7 .\csv_to_elastic.py --index chicago-crimes Crimes_-_2001_to_Present.csv
    ```

# Attributions
- Guido Lena Cota (@glenacota) (https://github.com/glenacota/elastic-training-repo): used his Docker Compose files as a template for this project, as well as the Shakespeare dataset.
- City of Albuquerque's ABQ Data project: https://www.cabq.gov/abq-data/
- City of Chicago's datasets

# License
MIT license, like almost all of my projects. I believe in getting work done and improving the lives of people, and a lot of those people work in real jobs in the real world. GPL...just makes life harder.
