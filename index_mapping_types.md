# kibana_sample_data_logs
| Field | type | Notes |
| ----- | ---- | ----- |
| @timestamp | alias | Alias for `timestamp` |



```json
{
    "@timestamp": {
        "type": "alias",
        "path": "timestamp"
    },
    "agent": {
        "type": "text",
        "fields": {
            "keyword": {
                "type": "keyword"
            }
        }
    },
    "bytes": {
        "type": "long"
    },
    "clientip": {
        "type": "ip"
    },
    "event": {
        "dataset": {
            "type": "keyword"
        }
    },
    "extension": {
        "type": "text",
        "fields": {
            "keyword": {
                "type": "keyword"
            }
        }
    },
    "geo": {
        "coordinates": {
            "type": "geo_point"
        },
        "dest": {
            "type": "keyword"
        },
        "src": {
            "type": "keyword"
        },
        "srcdest": {
            "type": "keyword"
        }
    },
    "host": {
        "type": "text",
        "fields": {
            "keyword": {
                "type": "keyword"
            }
        }
    },
    "index": {
        "type": "text",
        "fields": {
            "keyword": {
                "type": "keyword"
            }
        }
    },
    "ip": {
        "type": "ip"
    },
    "ip_range": {
        "type": "ip_range"
    },
    "machine": {
        "os": {
            "type": "text",
            "fields": {
                "keyword": {
                    "type": "keyword"
                }
            }
        },
        "ram": {
            "type": "long"
        }
    },
    "memory": {
        "type": "double"
    },
    "message": {
        "type": "text",
        "fields": {
        "keyword": {
            "type": "keyword"
        }
        }
    },
    "phpmemory": {
        "type": "long"
    },
    "referer": {
        "type": "keyword"
    },
    "request": {
        "type": "text",
        "fields": {
        "keyword": {
            "type": "keyword"
        }
        }
    },
    "response": {
        "type": "text",
        "fields": {
            "keyword": {
                "type": "keyword"
            }
        }
    },
    "tags": {
        "type": "text",
        "fields": {
            "keyword": {
                "type": "keyword"
            }
        }
    },
    "timestamp": {
        "type": "date"
    },
    "timestamp_range": {
        "type": "date_range"
    },
    "url": {
        "type": "text",
        "fields": {
            "keyword": {
                "type": "keyword"
            }
        }
    },
    "utc_time": {
        "type": "date"
    }
}
```
