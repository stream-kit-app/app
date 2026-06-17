/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4829103847")

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

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4829103847")

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

  return app.save(collection)
})
