---
title: Schema
date: "2020-03-22"
order: 153
---

## How Aventum creates the schemas dynamically for the content?

Since MongoDB schema-less so when you create a schema Aventum convert it to a schema understandable by MongoDB, however, if you used SQL based database like PostgreSQL or MySQL then here is a close description of what Aventum do to achieve the dynamic schema.

On creating a schema Aventum creates a table with the name same as the name that you put when you created the schema, with the fields that you added however if the field is repeatable and the repeatable field is **Relation** or **Upload** then Aventum considers this as many-to-many relationship and will create a third table with the name `${schemaName}-${reference}-${fieldName}` with columns `${reference}Id`(if the content has relation with itself like for example categories have child categories then this column will be `child${Reference}Id`) and `${schemaName}Id` the reference here is the uploads table or the `relation` table.

If the repeatable field is a `select` field then Aventum will create a table for this field with the name `${schemaName}-${fieldName}-options` and save the `select` field options within it, then will create another table with the name `${schemaName}-${fieldName}` with `${schemaName}-${fieldName}-optionsId` and `${schemaName}Id` columns.

If the repeatable field is not a relation or select or upload then Aventum will create `${schemaName}-${fieldName}` table with `${schemaName}Id` and `value` columns and the `value` columns will have the same field type.

The "custom" field will be saved as a JSON string in a `text` column type no matter if it was repealable or not.

To see how Aventum creates these tables take a look at `AventumFolder/server/models/sql/schema.js`
To see how Aventum saves the content data within these tables take a look at `AventumFolder/server/models/sql/content.js`.

## Where Aventum saves the schema settings?

Aventum saves the schema settings in the schemas table/collection.
