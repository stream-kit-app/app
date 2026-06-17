/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4829103847")

  // update field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text9384726104",
    "max": 0,
    "min": 0,
    "name": "streamKitVersion",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text5729103846",
    "max": 0,
    "min": 0,
    "name": "entry",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(5, new Field({
    "exceptDomains": [],
    "help": "",
    "hidden": false,
    "id": "url8392017465",
    "name": "downloadUrl",
    "onlyDomains": [],
    "presentable": false,
    "required": true,
    "system": false,
    "type": "url"
  }))

  // update field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text6293847102",
    "max": 64,
    "min": 0,
    "name": "sha256",
    "pattern": "^[a-f0-9]*$",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(7, new Field({
    "convertURLs": false,
    "help": "",
    "hidden": false,
    "id": "editor3847291056",
    "maxSize": 0,
    "name": "changelog",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "editor"
  }))

  // update field
  collection.fields.addAt(8, new Field({
    "help": "",
    "hidden": false,
    "id": "bool9283746102",
    "name": "isLatest",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "bool"
  }))

  // update field
  collection.fields.addAt(9, new Field({
    "help": "",
    "hidden": false,
    "id": "date7382910465",
    "max": "",
    "min": "",
    "name": "publishedAt",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4829103847")

  // update field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text9384726104",
    "max": 0,
    "min": 0,
    "name": "streamKitVersion",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text5729103846",
    "max": 0,
    "min": 0,
    "name": "entry",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(5, new Field({
    "exceptDomains": [],
    "help": "",
    "hidden": false,
    "id": "url8392017465",
    "name": "downloadUrl",
    "onlyDomains": [],
    "presentable": false,
    "required": false,
    "system": false,
    "type": "url"
  }))

  // update field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text6293847102",
    "max": 64,
    "min": 0,
    "name": "sha256",
    "pattern": "^[a-f0-9]*$",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(7, new Field({
    "convertURLs": false,
    "help": "",
    "hidden": false,
    "id": "editor3847291056",
    "maxSize": 0,
    "name": "changelog",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  // update field
  collection.fields.addAt(8, new Field({
    "help": "",
    "hidden": false,
    "id": "bool9283746102",
    "name": "isLatest",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // update field
  collection.fields.addAt(9, new Field({
    "help": "",
    "hidden": false,
    "id": "date7382910465",
    "max": "",
    "min": "",
    "name": "publishedAt",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
})
