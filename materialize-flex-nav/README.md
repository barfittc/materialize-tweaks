This tweak requires; Materialize, jQuery

Add after jQuery, Materialize
`<script type="text/javascript" src="https://barfittc.github.io/materialize-tweaks/materialize-flex-nav/materialize.flex-nav.min.js"></script>`

Turns the Navbar into an animated navbar, with a logo tween

Example, create the normal materialize FIXED navbar, call the following on the nav element, add the flex-nav for cleanliness

The Logo uses the site-title built into materialize, have it empty, nothing inside the .site-title element

```javascript
    $('.flex-nav').flexnav({
      logo: {
        selector: ".site-title",
        padding: "5px",
        large: "img/logo-white.png",
        small: "img/logo-colour.png"
      },
      height: {
        large: "150px",
        small: "80px"
      }
    });
```
