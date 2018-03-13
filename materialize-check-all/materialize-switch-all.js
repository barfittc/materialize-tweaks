
    
  $(document).ready(function(){

    function onCheckChanged (event) {
        var checkbox = $(this).siblings("input").first();
        
        if (checkbox.data("is-all"))
        {
            if (checkbox.is(':checked'))
            {
                event.data.each(function(index, element) {
                    $(element).removeAttr('checked');
                });
            }
            else
            {
                event.data.each(function(index, element) {
                    $(element).attr('checked', true);
                });
            }
        }
        else
        {

            if (checkbox.is(':checked'))
            {
                checkbox.removeAttr('checked');
                event.data.each(function(index, element) {
                    var that = $(element);
                    if (that.data("is-all")){
                        that.removeAttr('checked');
                    }
                });
            }
            else
            {
                checkbox.attr('checked', true);
                var allchecked = true;
                event.data.each(function(index, element) {
                    var that = $(element);

                    if (!that.data("is-all") && !that.is(':checked'))
                    {
                        allchecked = false;
                    }
                });

                if (allchecked)
                {
                    event.data.each(function(index, element) {
                        var that = $(element);
                        if (that.data("is-all")) {
                            that.attr('checked', true);
                        }
                    });
                }
            }
        }


        //console.log (!checkbox.is(':checked'), event.data, checkbox, checkbox.data("is-all"));
        event.preventDefault();
        event.stopPropagation();
    }
    $(`[data-check-all]`).each(function() {

        var allSwitch = $(this);
        var switchName = allSwitch.attr("data-check-all");
        var switches = $(`#${switchName}`).find("[type='checkbox']");
        var allchecked = true;

        switches.each(function(index, element) {
            var that = $(element);
            that.data("is-all", $(element).attr("data-check-all") === switchName);

            if (!that.data("is-all") && !that.is(':checked'))
            {
                allchecked = false;
            }
        });

        if (allchecked)
        {
            switches.each(function(index, element) {
                var that = $(element);
                if (that.data("is-all")) {
                    that.attr('checked', true);
                }
            });
        }

        switches.siblings("span").on("click", switches, onCheckChanged);
    });
  });