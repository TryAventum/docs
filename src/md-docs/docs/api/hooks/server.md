---
title: Server Hooks
date: "2020-03-22"
order: 206
---

## sqlBeforeDelete(applyFilters)

Fires before deleting from the SQL databases

### Parameters

- where(Object): the where clause
- this(Object): the model
- model(Object): the newly created model instance

### Source

File: https://github.com/TryAventum/server/blob/main/models/sql/lib/Model.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## sqlBeforeSave(doAction)

Fires before save data into SQL database

### Parameters

- this(Object): the model instance

### Source

File: https://github.com/TryAventum/server/blob/main/models/sql/lib/Model.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## sqlBeforeCreate(applyFilters)

Fires before inserting data into the SQL database

### Parameters

- values((Array|Object)): the data that will inserted into the database
- this(Object): the model
- model(Object): the newly created model instance

### Source

File: https://github.com/TryAventum/server/blob/main/models/sql/lib/Model.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## sqlBeforeUpdate(applyFilters)

Fires before updating SQL data

### Parameters

- model(Object): the newly created model instance
- this(Object): the model

### Source

File: https://github.com/TryAventum/server/blob/main/models/sql/lib/Model.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## sqlBeforeUpdateOne(applyFilters)

Fires before updating SQL data

### Parameters

- options(Object): the data that will updated with the where clause
- this(Object): the model

### Source

File: https://github.com/TryAventum/server/blob/main/models/sql/lib/Model.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |
