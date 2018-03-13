
See [angular.io](https://angular.io/docs/ts/latest/api/common/index/DatePipe-class.html) for Documentation on how to use.
It's the same interface as DatePipe, just named DateFormatter

you can include the locale if needed

```html
	<script src="https://barfittc.github.io/materialize-tweaks/angular2-datepipe/DateFormatter.min.js"></script>
	<script>
		(function() {					
			var date = Date.now();
			var formatter = new DateFormatter();
			console.log(date, formatter, formatter.format(date, 'dd/MM/yyyy'));
		})();
	</script>
```
