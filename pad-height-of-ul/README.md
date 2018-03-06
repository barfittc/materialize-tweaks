This tweak doesn't rely on Materialize, it requires jQuery.
Add after jQuery
<script type="text/javascript" src="https://raw.github.com/barfittc/materialize-tweaks/master/pad-height-of-ul/pad-height-of-ul.min.js"></script>

Used to add a padding on any virtical UI/OL list.



Add one <li class="pad-height"></li> to any UI/OL and it will automaticly size the item to pad space between top and bottem list elements

Example

<ul style="height:100%">
    
    <li>This will be at the top</li>

    <li class="pad-height"></li>

    <li>This will be at the bottom</li>

</ul>
