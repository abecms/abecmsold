# Abe type image

> Abe type __image__

###Basic example

```html
{{abe type='image' key='image_key' desc='give some tips' thumbs='250x250,350x350'}}
```

###Config Abe.json
You can change the directory where file will be uploaded inside abe.json config file.

To do this add __upload__ object that contains an __image__ property, the value of this propertie will be the path to your upload folder (relative to the root path of your project)

You can also limit the size of the file uploaded via abe, to do this add a __fileSizelimit__ if the file uploaded are over the limit they won't be uploaded and the user will get back an error message

```
"upload": {
  "image": "destinations/imagerie",
  "fileSizelimit": 20971520
}
```

###Parameters

> __type__ = image
> 
> __key__ = references key to use into your html

optional parameters

- desc = (String)
- display = (String)
- reload = (Boolean)
- thumbs = (Array[WIDTHxHEIGHT] separated with ",")

###Thumbs

If thumbs is used on your tag you can create thumbnails from the image you upload

####Exemple :

uploading a image named *my_image.jpg* will create a thumbs by default named my_image_thumb.jpg

if the tag contains ```thumbs='250x250,350x350'``` this will also create *my_image_thumb_250x250.jpg* & *my_image_thumb_350x350.jpg*

###Important

thumb are created using https://github.com/jwagner/smartcrop-cli which require to have imagemagick installed on your computer, if you don't a fallback library full JS is used (https://github.com/oliver-moran/jimp) but doesn't crop in a smart way your images
