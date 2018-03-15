This tweak doesn't rely on Materialize, it requires jQuery.
Add after jQuery
`<script type="text/javascript" src="https://barfittc.github.io/materialize-tweaks/serialize-json/serialize-json.min.js"></script>`

Serialized Forms into JSON

Example
```javascript
    console.log($( "form" ).serializeJson());
```
