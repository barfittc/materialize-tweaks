$(document).ready(function()
{

    $.fn.flexnav = function(NavSettings) {



		var $globalNav = this;
		var $window = $(window);
		var logoPaddingOffset = 2 * parseInt(NavSettings.logo.padding, 10);
  
		$('head').prepend("<style>"+getTemplate(
		  "" + NavSettings.height.large,
		  "" + NavSettings.height.small,
		  "" + (parseInt(NavSettings.height.large, 10) - logoPaddingOffset) + suffix(NavSettings.height.large),
		  "" + (parseInt(NavSettings.height.small, 10) - logoPaddingOffset) + suffix(NavSettings.height.small),
		  "" + NavSettings.logo.padding
		  )+"</style>");
		  // override the "padding at the top caused be the navbar"
		  $('head').append(`<style>
		   .navbar-fixed {
	height: 0px;
  }
  
  @media only screen and (min-width: 601px)
  {
	.navbar-fixed {
	  height: 0px;
	}
  }</style>`);


 
  
		var $siteLogo = $globalNav.find(NavSettings.logo.selector);
		$siteLogo.append('<img id="small-logo" src="'+NavSettings.logo.small+'" class="flex-nav-logo" />');
		$siteLogo.append('<img id="big-logo" src="'+NavSettings.logo.large+'" class="flex-nav-logo" />');
  
		$globalNav.prepend('<div class="nav-background big"></div>');
		$globalNav.prepend('<div class="nav-background small"></div>');
  
  
		$globalNav.addClass('not-scrolled-nav');
		$globalNav.addClass('flex-nav');
		
		
		var scrollTop = $window.scrollTop();
  
		$(window).scroll(function (){
		  scrollTop = $window.scrollTop();
		  
		  if (scrollTop >= 150 && $globalNav.hasClass('not-scrolled-nav')) {
			$globalNav.addClass('scrolled-nav');
			$globalNav.removeClass('not-scrolled-nav');
  
		  } else if (scrollTop < 150 && $globalNav.hasClass('scrolled-nav')) {
			$globalNav.removeClass('scrolled-nav');
			$globalNav.addClass('not-scrolled-nav');
  
		  } 
		  
		});
		function replace(search, replacement, target)
		{
			return target.replace(new RegExp(search, 'g'), replacement);
		}
		function suffix (val)
		{
		  return replace(""+ parseInt(val, 10), "", val)
		}
		function getTemplate(maxHeight, minHeight, logoMaxHeight, logoMinHeight, logoPadding)
		{
		  return replace("{max-height}", maxHeight,
		  replace("{min-height}", minHeight,
		  replace("{logo-max-height}", logoMaxHeight,
		  replace("{logo-min-height}", logoMinHeight,
		  replace("{logo-padding}", logoPadding, `
  .flex-nav {
	height: {max-height};
	line-height: {max-height};
  }
  .scrolled-nav {
	height: {min-height} !important;
	line-height: {min-height} !important;
  }
  .flex-nav-logo {
	top: {logo-padding};
  }
  .flex-nav.not-scrolled-nav .nav-wrapper i {
	height: {max-height};
	line-height: {max-height};
  }
  @media only screen and (min-width: 601px)
  {
	.flex-nav.scrolled-nav .nav-wrapper i {
		height: {min-height};
		line-height: {min-height};
	}
  }
  @keyframes NavBarGrowFadeIn {
	  0% {
		  opacity: 0;
		  height: {logo-min-height};
		  width: auto;
	  }
	  100% {
		  opacity: 1;
		  height: {logo-max-height};
		  width: auto;
	  }
  }  
  @keyframes NavBarShrinkFadeOut {
	  0% {
		  opacity: 1;
		  height: {logo-max-height};
		  width: auto;
	  }
	  100% {
		  opacity: 0;
		  height: {logo-min-height};
		  width: auto;
	  }
  }
  @keyframes NavBarGrowFadeOut {
	  0% {
		  opacity: 1;
		  height: {logo-min-height};
		  width: auto;
	  }
	  100% {
		  opacity: 0;
		  height: {logo-max-height};
		  width: auto;
	  }
  }
  @keyframes NavBarShrinkFadeIn {
	  0% {
		  opacity: 0;
		  height: {logo-max-height};
		  width: auto;
	  }
	  100% {
		  opacity: 1;
		  height: {logo-min-height};
		  width: auto;
	  }
  }
  @keyframes NavBarShrinkFadeBgOut {
	0% {
	  opacity: 1;
	  height: {max-height};
	}
	100% {
	  opacity: 0;
	  height: {min-height};
	}
  }
  @keyframes NavBarShrinkFadeBgIn {
	0% {
	  opacity: 0;
	  height: {max-height};
	}
	100% {
	  opacity: 1;
	  height: {min-height};
	}
  }
  @keyframes NavBarGrowFadeBgOut {
	0% {
	  opacity: 1;
	  height: {min-height};
	}
	100% {
	  opacity: 0;
	  height: {max-height};
	}
  }
  @keyframes NavBarGrowFadeBgIn {
	0% {
	  opacity: 0;
	  height: {min-height};
	}
	100% {
	  opacity: 1;
	  height: {max-height};
	}
  }
  
  
  /* DO NOT TOUCH BELLOW THIS LINE*/
  .flex-nav {
	position: fixed;
	top: 0;
	z-index: 9999;
	width: 100%;
	-webkit-transition: height .5s, line-height .5s, color .5s, background-color 0.5s ease;
	transition: height .5s, line-height .5s, color .5s, background-color 0.5s ease;
	background: rgba(0,0,0,0);
  }
  
  .flex-nav-logo {
	position: absolute;
	float: left;
	left: 15%;
  }
	
  /**
	Floating NavBar
   */
  .flex-nav .nav-wrapper i
  {
	-webkit-transition: height .5s, line-height .5s, color .5s; /* Safari */
	transition: height .5s, line-height .5s, color .5s;
  }
  
  
  
  /*LogoAnimation*/
  
  .not-scrolled-nav #big-logo,
  .scrolled-nav #big-logo,
  .not-scrolled-nav  #small-logo,
  .scrolled-nav #small-logo
  {
	animation-duration: .7s;
	animation-fill-mode: both;
  }
  
  .not-scrolled-nav #big-logo {
	animation-name: NavBarGrowFadeIn;
  }
  .scrolled-nav #big-logo {
	animation-name: NavBarShrinkFadeOut;
  }
  .not-scrolled-nav #small-logo {
	animation-name: NavBarGrowFadeOut;
  }
  .scrolled-nav #small-logo {
	animation-name: NavBarShrinkFadeIn;
  }
  
  /*Background Animation*/
  .nav-background
  {
	animation-duration: .5s;
	animation-fill-mode: both;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
  }
  
  .scrolled-nav .nav-background.big
  {
	animation: NavBarShrinkFadeBgOut;
	animation-duration: .5s;
	animation-fill-mode: both;
  }
  .scrolled-nav .nav-background.small
  {
	animation: NavBarShrinkFadeBgIn;
	animation-duration: .5s;
	animation-fill-mode: both;
  }
  .not-scrolled-nav .nav-background.small
  {
	animation: NavBarGrowFadeBgOut;
	animation-duration: .5s;
	animation-fill-mode: both;
  }
  .not-scrolled-nav .nav-background.big
  {
	animation: NavBarGrowFadeBgIn;
	animation-duration: .5s;
	animation-fill-mode: both;
  }
  `)))));
		}


        return this;
    };

});