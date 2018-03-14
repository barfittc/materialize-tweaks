$(document).ready(function()
{
    function paddingHeight()
    {
        $("li.pad-height").each( function()
        {
            var that = $( this );
            var parent = that.parent();
            var liHeight = 0;
            
            parent
                .children()
                .each(function()
            {
                if (!$( this ).hasClass("pad-height"))
                    liHeight += $( this ).height();
            });

            that.height( parent.height() - parseInt(parent.css("margin-top")) - liHeight);
        });
    }

    paddingHeight();

    $( window ).resize(paddingHeight);

});