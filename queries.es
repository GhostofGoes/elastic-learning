GET _cat/indices?v

GET _cat/indices/olympic-events?v&h=index,health,docs.count,pri.store.size

GET _cluster/health

GET _cluster/allocation/explain

GET olympic-events

GET olympic-events/_search
{
  "size": 0,
  "aggs": {
    "agez": {
      "terms": {
        "field": "Age.keyword",
        "size": 150
      }
    }
  }
}

POST _reindex
{
  "source": {
    "index": "olympic-events"
  },
  "dest": {
    "index": "olympic-events-backup"
  }
}

GET olympic-events/_search
{
  "query": {
    "term": {
      "Age": "23"
    }
  }
}

POST olympic-events/_delete_by_query
{
  "query": {
    "term": {
      "Age": "NA"
    }
  }
}

POST olympic-events/_delete_by_query
{
  "query": {
    "multi_match": {
      "query": "NA",
      "fields": ["Height", "Weight", "Age"]
    }
  }
}

GET kibana_sample_data_logs

GET kibana_sample_data_logs/_search

GET kibana_sample_data_logs/_search
{
  "size": 0,
  "aggs": {
    "datething": {
      "date_histogram": {
        "field": "timestamp",
        "calendar_interval": "week"
      }
    }
  }
}

GET kibana_sample_data_logs/_search
{
  "size": 0,
  "aggs": {
    "hist": {
      "histogram": {
        "field": "bytes",
        "interval": 1000
      }
    }
  }
}

GET kibana_sample_data_logs/_search
{
  "size": 0,
  "aggs": {
    "os_terms": {
      "terms": {
        "field": "machine.os.keyword",
        "size": 10
      }
    }
  }
}

GET kibana_sample_data_logs/_search
{
  "size": 0,
  "query": {
    "match": {
      "machine.os.keyword": {
        "query": "ios",
        "operator": "and"
      }
    }
  },
  "aggs": {
    "ion_ips": {
      "terms": {
        "field": "ip",
        "size": 1000
      }
    }
    
  }
}


GET kibana_sample_data_logs/_search
{
  "size": 0,
  "aggs": {
    "agents": {
      "terms": {
        "field": "referer",
        "size": 1000
      },
      "aggs": {
        "bytes": {
          "terms": {
            "field": "ip",
            "size": 10
          }
        }
      }
    }
  }
}


GET kibana_sample_data_logs/_search
{
	"aggs": {
		"some_name": {
			"terms": {
				"field": "bytes"
			},
			"aggs": {
				"another_name": {
					"terms": {
						"field": "ip",
						"size": 15
					}
				}
			}
		}
	}
}


GET kibana_sample_data_logs/_search
{
  "size": 0,
  "aggs": {
    "test": {
      "cardinality": {
        "field": "bytes"
      }
    }
  }
}



# "On which days did we not meet our SLAs (95% of the requests took less than 500ms)?"""
GET kibana_sample_data_logs/_search
{
  "size": 0,
  "aggs": {
    "req_resp": {
      "date_histogram": {
        "field": "timestamp",
        "calendar_interval": "day"
      },
      "aggs": {
        "resp_code": {
          "terms": {
            "field": "machine.os.keyword",
            "size": 10
          },
          "aggs": {
            "total_bytes": {
              "sum": {
                "field": "bytes"
              }
            }
          }
        }
      }
    }
  }
}


# "How many requests per day by response code?"
GET kibana_sample_data_ecommerce/_search
{
  "size": 0,
  "aggs": {
    "top_products": {
      "terms": {
        "field": "products.product_name.keyword"
      },
      "aggs": {
        "top_product_hits": {
          "top_hits": {
            "size": 3
          }
        }
      }
    }
  }
}

# "What are the most significant terms of the top 3 authors?""
GET kibana_sample_data_ecommerce/_search
{
  "size": 0,
  "aggs": {
    "significant_products_by_manuf": {
      "terms": {
        "field": "manufacturer.keyword",
        "size": 3,
        "order": {
          "_count": "desc"
        }
      },
      "aggs": {
        "sig_prods": {
          "significant_text": {
            "field": "products.product_name"
          }
        }
      }
    }
  }
}


PUT kibana_sample_data_ecommerce/_mapping
{
  "properties": {
    "test_field": {
      "type": "scaled_float",
      "scaling_factor": 100
    }
  }
}


PUT playing_with_mappings
{
  "mappings": {
    "properties": {
      "page": {
        "properties": {
          "contents": {
            "type": "text",
            "analyzer": "english",
            "fields": {
              "keyword": {
                "type": "keyword"
              }
            }
          }
        }
      }
    }
  }
}
GET playing_with_mappings/_mapping


GET _cluster/state

GET _cluster/state?filter_path=metadata.cluster_coordination.last_committed_config

GET _cluster/health

GET _cluster/health?level=indices
GET _cluster/health?level=shards


GET _cluster/allocation/explain

GET _cluster/allocation/explain
{
  "index": "kibana_sample_data_ecommerce",
  "shard": 0,
  "primary": true
}


GET _cat/nodes?v
GET _cat/nodes?help
GET _cat/nodes?v&h=name,disk.avail,search.query_total,heap.percent

GET _cluster/pending_tasks

GET _tasks

GET _nodes/thread_pool
GET _nodes/stats/thread_pool
GET _cat/thread_pool?v
GET _cat/thread_pool?help
GET _nodes/hot_threads
GET _nodes/master/hot_threads


# TODO: slow log settings


GET kibana_sample_data_ecommerce/_search
{
  "size": 2,
  "profile": true
}


GET _analyze
{
  "analyzer": "english",
  "text": "some example text"
}
GET _analyze
{
  "analyzer": "english",
  "text": "Tuning Go Apps in a Beat"
}

POST _reindex
{
  "source": {
    "index": "olympic-events"
  },
  "dest": {
    "index": "olympic-events-backup-2"
  }
}

DELETE blogs_test
PUT blogs_test
{
  "settings": {
    "analysis": {
      "char_filter": {
        "xpack_filter": {
          "type": "mapping",
          "mappings": ["X-Pack => XPack"]
        }
      },
      "filter": {
        "my_snowball_filter": {
          "type": "snowball",
          "language": "English"
        }
      }, 
      "analyzer": {
        "my_content_analyzer": {
          "type": "custom",
          "char_filter": ["xpack_filter"],
          "tokenizer": "standard",
          "filter": ["lowercase", "stop", "my_snowball_filter"]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "content": {
        "type": "text",
        "analyzer": "my_content_analyzer"
      }
    }
  }
}

POST blogs_test/_analyze
{
  "text": ["Autodiscovery allows the user to configure providers"],
  "analyzer": "my_content_analyzer"
}

GET chicago-crimes/_search

POST _reindex
{
  "max_docs": 150,
  "source": {
    "index": "chicago-crimes",
    "query": {
      "match": {
        "location_description": "RESIDENCE"
      }
    }
  },
  "dest": {
    "index": "chicago-limited-residence-crimes"
  }
}
GET chicago-limited-residence-crimes/_search

GET chicago-crimes/_settings

GET chicago-crimes/_search
{
  "size": 15,
  "query": {
    "bool": {
      "must_not": [
        {
          "terms": {
            "arrest": ["false", "true"]
          }
        }
      ]
    }
  }
}
GET chicago-crimes/_search
{
  "size": 15,
  "query": {
    "bool": {
      "must_not": [
        {
          "terms": {
            "domestic": ["false", "true"]
          }
        }
      ]
    }
  }
}

DELETE chicago-crimes-better-mapping
PUT chicago-crimes-better-mapping
{
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 1
    },
    "mappings": {
        "properties": {
            "@timestamp": {
                "type": "alias",
                "path": "date"
            },
            "arrest": {
                "type": "boolean"
            },
            "beat": {
                "type": "keyword"
            },
            "block": {
                "type": "keyword",
                "fields": {
                    "text": {
                        "type": "text",
                        "analyzer": "english"
                    }
                }
            },
            "case_number": {
                "type": "keyword"
            },
            "community_area": {
                "type": "keyword"
            },
            "date": {
              "type": "date",
              "format": "MM/dd/yyyy hh:mm:ss a"
            },
            "description": {
                "type": "text",
                "analyzer": "english",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "district": {
                "type": "keyword"
            },
            "domestic": {
                "type": "boolean"
            },
            "fbi_code": {
                "type": "keyword"
            },
            "id": {
                "type": "long"
            },
            "iucr": {
                "type": "keyword"
            },
            "latitude": {
                "type": "float"
            },
            "location": {
                "type": "keyword"
            },
            "location_description": {
                "type": "keyword",
                "fields": {
                    "text": {
                        "type": "text",
                        "analyzer": "english"
                    }
                }
            },
            "longitude": {
                "type": "float"
            },
            "primary_type": {
                "type": "keyword",
                "fields": {
                    "text": {
                        "type": "text",
                        "analyzer": "english"
                    }
                }
            },
            "updated_on": {
                "type": "date",
                "format": "MM/dd/yyyy hh:mm:ss a"
            },
            "ward": {
                "type": "keyword"
            },
            "x_coordinate": {
                "type": "integer"
            },
            "y_coordinate": {
                "type": "integer"
            },
            "year": {
                "type": "short"
            }
        }
    }
}
POST _reindex?wait_for_completion=false
{
  "source": {
    "index": "chicago-crimes"
  },
  "dest": {
    "index": "chicago-crimes-better-mapping"
  }
}
GET chicago-crimes-better-mapping/_search
{
  "query": {
    "range": {
      "year": {
        "gte": 2019
      }
    }
  }
}

GET _tasks
GET _cat/tasks?v&h=action,task_id,parent_task_id,type,running_time,node
GET _tasks/jU8P54f9SNexcqecSFbb9A:999952


POST blogs_test/_freeze
POST blogs_test/_unfreeze

GET chicago-crimes-better-mapping/_mapping
GET chicago-crimes-better-mapping/_search
{
  "size": 0,
  "aggs": {
    "top_10_crimes": {
      "terms": {
        "field": "description.keyword",
        "size": 10
      }
    }
  }
}

GET kibana_sample_data_logs/_search

GET kibana_sample_data_logs/_search
{
  "size": 0,
  "aggs": {
    "task_1": {
      "date_histogram": {
        "field": "timestamp",
        "calendar_interval": "month",
        "order": {
          "average_bytes_by_month": "desc"
        }
      },
      "aggs": {
        "average_bytes_by_month": {
          "avg": {
            "field": "bytes"
          }
        }
      }
    },
    "max_avg": {
      "max_bucket": {
        "buckets_path": "task_1>average_bytes_by_month"
      }
    }
  }
}



PUT _ingest/pipeline/earthquakes_pipeline
{
  "processors": [
    {
      "uppercase": {
        "field": "magnitude_type"
      }
    },
    {
      "script": {
        "lang": "painless",
        "source": """
if(ctx.containsKey("batch_number")) {
  ctx.batch_number++;
} else {
  ctx.batch_number = 1;
}
        """
      }
    }
  ]
}

POST _ingest/pipeline/_simulate
{
  "docs": [
    {
      
    }
    
  ]
}

# apply pipeline to all docs in index
POST olympic-events-backup-2/_update_by_query?pipeline=earthquakes_pipeline


GET olympic-events/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match_phrase": {
            "Event": "Wrestling Men's"
          }
        }
      ],
      "should": [
        {
          "match_phrase": {
            "Sport": "Wrestling"
          }
        },
        {
          "match_phrase": {
            "Games": "Summer"
          }
        },
        {
          "match_phrase": {
            "Medal": "Gold"
          }
        }
      ],
      "minimum_should_match": 2
    }
  }
}

GET kibana_sample_data_logs/_search
{
  "size": 0,
  "aggs": {
    "max_bytes_month": {
      "date_histogram": {
        "field": "timestamp",
        "calendar_interval": "month"
      },
      "aggs": {
        "max_bytes": {
          "max": {
            "field": "bytes"
          }
        }
      }
    }
  }
}


POST logs-my.app-production/_doc
{
  "@timestamp": "2021-02-02T00:00:00.000Z",
  "testing": "123"
}


# Create index alias
POST _aliases
{
  "actions": [
    {
      "add": {
        "index": "chicago-crimes",
        "alias": "crimes"
      }
    }
  ]
}

# Update index alias
POST _aliases
{
  "actions": [
    {
      "add": {
        "index": "chicago-crimes-better-mapping",
        "alias": "crimes"
      }
    },
    {
      "remove": {
        "index": "chicago-crimes",
        "alias": "crimes"
      }
    }
  ]
}

# Apply filter
POST _aliases
{
  "actions": [
    {
      "add": {
        "index": "olympic-events",
        "alias": "olympic-alias",
        "filter": {
          "match": {
            "Team": "Argentina"
          }
        }
      }
    }
  ]
}

GET olympic-alias/_search


PUT test_index/_doc/1
{
  "@timestamp": "2021-09-27T00:00:00.000Z",
  "name": "chris",
  "age": 27
}

PUT test_index/_mapping
{
  "dynamic_templates": [
    {
      "float_fields": {
        "match": "f_*",
        "mapping": {
          "type": "float"
        }
      }
    }
  ]
}

PUT test_index/_doc/2
{
  "f_weight": 500
}

GET test_index/_search
GET test_index/_mapping

GET crimes/_search
GET crimes/_alias

GET crimes/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "primary_type": "THEFT"
          }
        }
      ],
      "filter": [
        {
          "range": {
            "year": {
              "gte": 2020,
              "lte": 2021
            }
          }
        }
      ]
    }
  }
}


# asynchronous search
POST crimes/_async_search
{
  "query": {
    "bool": {
      "must_not": [
        {
          "match": {
            "primary_type": "THEFT"
          }
        }
      ]
    }
  }
}


# Legacy templates
PUT _template/test_template
{
  "index_patterns": ["test_index"],
  "order": 2,
  "settings": {
    "number_of_replicas": 1
  },
  "mappings": {
    "properties": {
      "@timestamp": {
        "type": "date",
        "format": "yyyy/mm/dd"
      }
    }
  }
}























