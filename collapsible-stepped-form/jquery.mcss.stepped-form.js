

jQuery.fn.extend({
    nextForm: function (settings) {

        return this.each(function () {

            var _formSettings = {
                step: -1,
                max: 2,
                next: $("<div></div>"),
                prev: $("<div></div>"),
                submit: $("<div></div>"),
                onSubmit: function (){},
                validate: {},
                setup: {},
                _wasSetup:{},
                that: $(this),
                actions: {
                    validate : async function () {
                        if (_formSettings.validate[_formSettings.step]) {

                            var r = _formSettings.validate[_formSettings.step]();

                            if (typeof(r) === "boolean")
                            {
                                if ((r === false)) {
                                    console.warn("Validation failed on step", _formSettings.step);
                                    return false;
                                }
                            }
                            else if (typeof(r) === "object")
                            {
                                try
                                {
                                    var res = await r;

                                    if (typeof(res) === "boolean")
                                    {
                                        if ((res === false))
                                        {
                                            console.warn("Validation failed on step", _formSettings.step);
                                            return false;
                                        }
                                    }
                                    else  if (typeof(res) === "undefined")
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        console.error("Invalid Validation return on step", _formSettings.step, "data is not boolean:", res);
                                        return false;
                                    }
                                }
                                catch (e)
                                {
                                    console.error("Validation error on step", _formSettings.step, "data:",e);
                                    return false;
                                }
                            }
                        }
                        return true;
                    },
                    setupAction : async function (_newStep) {

                        _formSettings.that.collapsible('open', _formSettings.step);

                        if (_formSettings._wasSetup[_formSettings.step] === undefined)
                        {
                            _formSettings._wasSetup[_formSettings.step] = true;
                            if (_formSettings.setup[_formSettings.step])
                            {
                                await _formSettings.setup[_formSettings.step]();
                            }
                        }

                        _formSettings.actions.setButton();
                    },
                    setButton: function () {
                        function disable(object, val)
                        {
                            if (val && !object.hasClass("disabled"))
                                object.addClass("disabled");

                            if (!val && object.hasClass("disabled"))
                                object.removeClass("disabled");
                        }
                        disable(_formSettings.prev, _formSettings.step <= 0);
                        disable(_formSettings.next, _formSettings.step >= _formSettings.max);
                        disable(_formSettings.submit, _formSettings.step < _formSettings.max);
                    },

                    NextAction: async function () {

                        if (!await _formSettings.actions.validate())
                            return false;


                        _formSettings.actions.setupAction(++_formSettings.step);
                    },
                    PrevAction: async function () {

                        _formSettings.actions.setupAction(--_formSettings.step);
                    }
                }
            };

            if (this._nextFormSettings !== undefined)
            {
                if (settings === "next")
                {
                    this._nextFormSettings.actions.NextAction();
                }
                else if (settings === "prev" || settings === "previous")
                {
                    this._nextFormSettings.actions.PrevAction();
                }
                

                return;
            }

            if (settings.next === undefined)
                throw new Error("Next(next) Button Needs to supplied");
            else
                _formSettings.next = settings.next;

            if (settings.prev === undefined)
                throw new Error("Previous(prev) Button Needs to supplied");
            else
                _formSettings.prev = settings.prev; 

            if (settings.submit === undefined)
                throw new Error("Submit(submit) Button Needs to supplied");
            else
                _formSettings.submit = settings.submit; 

            _formSettings.max = _formSettings.that.find(".collapsible-body").length - 1;
            if (_formSettings.max === -1)
                throw new Error("Collapsable needs to be coded in html, see http://materializecss.com/collapsible.html");

            _formSettings.setup = settings.setup || _formSettings.setup;
            _formSettings.onSubmit = settings.onSubmit || _formSettings.onSubmit;
            _formSettings.validate = settings.validate || _formSettings.validate;
            
            _formSettings.prev.show();
            _formSettings.next.show();
            _formSettings.submit.show();

            _formSettings.that.find("div.collapsible-header")
                .click(function () { return false; })
                .css("cursor", "default");

            _formSettings.next.click(_formSettings.actions.NextAction);
            _formSettings.prev.click(_formSettings.actions.PrevAction);
            _formSettings.submit.click(async function () {

                if (!await _formSettings.actions.validate())
                    return false;

                await settings.onSubmit();

            });

            this._nextFormSettings = _formSettings;

            _formSettings.actions.NextAction();

        });
    }
});