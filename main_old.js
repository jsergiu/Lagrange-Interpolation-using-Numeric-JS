function Matrix() {
	this.columns_count = 5;
	this.rows_count = 5;
}

Matrix.prototype.bind_events = function() {
	var self = this;
	$('#matrix_add_column').click(function(event) { self.add_column(); });
	$('#matrix_add_row').click(function(event) { self.add_row(); });
};

Matrix.prototype.add_row = function() {
	$('#matrix tr').last().clone().appendTo('#matrix');
	this.rows_count++;
};

Matrix.prototype.add_column = function() {
	$('#matrix tr').each(function(){
		$(this).find('td').last().clone().appendTo(this);
	})
	this.column_count++;
};

window.matrix = new Matrix();



$(document).ready(function(){
	matrix.bind_events();
});