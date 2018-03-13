This tweak requires; Materialize, jQuery

Add after jQuery
`<script type="text/javascript" src="https://barfittc.github.io/materialize-tweaks/materialize-check-all/materialize-switch-all.min.js"></script>`



Add's functionaly for an "All" check/switch



Add `data-check-all="{id}"` to any Materialize checkbox based object -This will make it the "All" checkbox-, add `id="{id}"` to an enclosing container to attach all checkboxes to this all Checkbox

Example
```html
      <div class="card" id="allexample">

            <div class="row">
                <div class="switch">
                    <label>
                        <input type="checkbox" data-check-all="allexample">
                        <span class="lever"></span>
                        All
                    </label>
                </div>
            </div>
            <hr>
            <div class="row">
                    <div class="switch">
                        <label>
                            <input type="checkbox">
                            <span class="lever"></span>
                            Manage Users
                        </label>
                    </div>
                </div>
                <div class="row">
                    <div class="switch">
                        <label>
                            <input type="checkbox">
                            <span class="lever"></span>
                            Manage Roles
                        </label>
                    </div>
                </div>
                <div class="row">
                    <div class="switch">
                        <label>
                            <input type="checkbox">
                            <span class="lever"></span>
                            Manage Billing
                        </label>
                    </div>
                </div>
                <div class="row">
                    <div class="switch">
                        <label>
                            <input type="checkbox">
                            <span class="lever"></span>
                            Manage Applications
                        </label>
                    </div>
                </div>
        </div>
```
