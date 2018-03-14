$(document).ready(function()
{
    var block = false;
    function onCheckChanged (checkbox, elements) {

        if (block)
            return;
        block = true;

        if (checkbox.hasAttribute("data-check-all"))
        {
            if ($(checkbox).is(':checked'))
            {
                elements.forEach(function(element)
                {
                    if (element === checkbox)
                        return;

                    setState(element, false);
                });
            }
            else
            {
                elements.forEach(function(element)
                {
                    if (element === checkbox)
                        return;

                    setState(element, true);
                });
            }
        }
        else
        {
            if ($(checkbox).is(':checked'))
            {
                elements.forEach(function(element)
                {
                    if (element.hasAttribute("data-check-all"))
                    {
                        setState(element, false);
                    }
                });
            }
            else
            {
                checkIfAll(elements, checkbox);
            }
        }
        block = false;
    }

    function setState(element, state)
    {
        var checkbox = $(element);
        var run = false;

        if (checkbox.is(':checked') && !state)
        {
            checkbox.siblings("span").click();
        }
        else if (!checkbox.is(':checked') && state)
        {
            checkbox.siblings("span").click();
        }
    }

    function checkIfAll(elements, ignore)
    {
        var allchecked = true;
        elements.forEach(function(element) {
            
            if (ignore === element)
                return;

            if (!element.hasAttribute("data-check-all") 
            && !$(element).is(':checked'))
            {
                allchecked = false;
            }
        });

        if (allchecked)
        {
            elements.forEach(function(element) {
                if (element.hasAttribute("data-check-all")) {
                    setState(element, true);
                }
            });
        }
    }
    $(`[data-check-all]`).each(function() {

        var switches = [];

        $(`#${$(this).attr("data-check-all")}`)
            .find("[type='checkbox']")
            .each(function(index, element)
        {
            switches.push($(element)[0]);
        });

        checkIfAll(switches);

        $(`#${$(this).attr("data-check-all")}`)
            .find("[type='checkbox']")
            .each(function(index, element)
        {
            $(element).siblings("span")[0].addEventListener("click", function(e)
            {
                onCheckChanged(element, switches);
            });

            $(element)[0].addEventListener("keyup", function(e)
            {
                if (e.keyCode == 32)
                {
                    onCheckChanged(this, switches);
                }

            });
        });
    });
});