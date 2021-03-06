$(document).ready(function()
{

    $.fn.serializeJson = function() {

        function getNames (name)
        {
            var indexOfFirstOpen = name.indexOf("[");
            var indexOfFirstClose = name.indexOf("]");
            if (name.length > indexOfFirstClose)
            {
                var firstName = name.substring(0, indexOfFirstOpen);
                var secondName = name.substring(indexOfFirstOpen + 1, indexOfFirstClose);
                var moreNames = name.replace(`${firstName}[${secondName}]`, "");

                return [ firstName, secondName + moreNames ];
            }
            else {
                return [
                    name.substring(0, indexOfFirstOpen),
                    name.substring(indexOfFirstOpen + 1, indexOfFirstClose)
                ];
            }

        }

        function _mapKeys (object, name, value)
        {
            if (!object)
            {
                object = {};
            }

            if (name.indexOf("[") > 0)
            {

                var names = getNames(name);

                if (names[1] === "")
                {
                    if (!object[names[0]])
                    {
                        object[names[0]] = [];
                    }

                    object[names[0]].push(value);
                }
                else
                {
                    object[names[0]] = _mapKeys(object[names[0]], names[1], value);
                }
            }
            else
            {
                object[name] = value;
            }
            return object;
        }


        var checkArray = [];

        $.map(this.find("input[type=checkbox],input[type=radio]"), function(n, i)
        {
            if ($(n).is(":checked"))
            {
                checkArray.push({
                    name : $(n).attr("name"),
                    value : $(n).attr("value")
                });
            }
        });


        // because serializeSeems to ignore ALL checkboxs now
        var unindexed_array = $.merge(this.serializeArray(), checkArray);

        var json_result = {};

        $.map(unindexed_array, function(n, i)
        {
            if (n['name'].indexOf("[") > 0)
            {
                var names = getNames(n['name']);
                json_result[names[0]] = _mapKeys(json_result[names[0]], names[1], n['value']);
            }
            else
            {
                json_result[n['name']] = n['value'];
            }
        });

        return json_result;
    };

});