This tweak doesn't rely on Materialize, it requires jQuery.
Add after jQuery
`<script type="text/javascript" src="https://barfittc.github.io/materialize-tweaks/pad-height-of-ul/pad-height-of-ul.min.js"></script>`

Used to add a padding on any virtical UL/OL list.



Add one `<li class="pad-height"></li>` to any UL/OL and it will automaticly size the item to pad space between top and bottem list elements

Example
```html
<ul style="height:100%">
    
    <li>This will be at the top</li>

    <li class="pad-height"></li>

    <li>This will be at the bottom</li>

</ul>
```
