var x_array = []; //punctele xi
var y_array = []; //valorile functiei f in xi
var l_array = []; //valorile functioe L in xi
var N = 20;
var Extra_x = 25; //valoare extra x barat

//pentru trig

var a_array = [];
var b_array = [];
/*************************************************************************
	Evenimente de click
*************************************************************************/
$(document).ready(function(){
	$('.nav-tabs li').eq(0).click(function(){ $('#expression').val('3*x*x + 5 * x + 2') });
	$('.nav-tabs li').eq(1).click(function(){ $('#expression').val('3*x*x + 5 * x + 2') });
	$('.nav-tabs li').eq(2).click(function(){ $('#expression').val('Math.sin(x) - Math.cos(x)') });
	$('#draw_inputs').click(function() { draw_inputs(); });
	$('#calculate').click(function() { calculate(); });

	//calcul pentru forma I Lagrange
	$('#calculate_L1').click(function() {

		//citim x si calculam y
		read_x_array(N);
		calc_y_array(N);

		//Calculez aproximarile functiei
		for (i = 0; i < N; i++) {
			l_array[i] = LagrangeFormaI(x_array[i]);
		}

		//calculez pentru valoare extra
		var expression = $('#expression').val();
		x = Extra_x;
		x_array[N] = Extra_x;
		y_array[N] = eval(expression);
		l_array[N] = LagrangeFormaII(Extra_x);

		show_results('lagrange_table_1', x_array, y_array, l_array);
		draw_chart(y_array, l_array);
	});

	//calcul pentru forma II Lagrange
	$('#calculate_L2').click(function() {

		//citim x si calculam y
		read_x_array(N);
		calc_y_array(N);

		//calculez aproximarile functiei
		for (i = 0; i < N; i++) {
			l_array[i] = LagrangeFormaII(x_array[i]);
		}

		//calculez pentru valoare extra
		var expression = $('#expression').val();
		x = Extra_x;
		x_array[N] = Extra_x;
		y_array[N] = eval(expression);
		l_array[N] = LagrangeFormaII(Extra_x);

		show_results('lagrange_table_2', x_array, y_array, l_array);
		draw_chart(y_array, l_array);
	});

	//calcul pentru interpolare trigonometrica
	$('#calculate_T').click(function() {

		//citim x si calculam y
		read_x_array(parseInt(N) + 1);
		calc_y_array(parseInt(N) + 1);
		trig_genereaza_T();
		trig_genereaza_x();
		trig_generaza_a();
		trig_generaza_b();

		for (var i = 0; i <= N; i++) {

			var expression = $('#expression').val();
			x = parseFloat(x_array[i]) + 0.1;
			y = eval(expression);

			console.log(y);
			var suma_a = calc_suma_a(x);
			var suma_b = calc_suma_b(x);
			l_array[i] = suma_a + suma_b - y;
		}

		//show_results('trig_table', x_array, y_array, trig_X);
		show_results('trig_table', x_array, y_array, l_array);

	});

});

/*************************************************************************
	Functii generale
*************************************************************************/

//functie care genreaza un array pt data de intrare
function draw_inputs() {
	N = parseInt($('#bigN').val());
	$('#inputs').html('');

	//daca e trigonometrica
	if ($('#messages').hasClass('active')) {
		for (var i = 0; i <= N; i++) {
			var min = 0;
			var max = 2 * Math.PI;
			var v =   Math.random() * (max - min) + min;
			var elem = '<input type="text" class="x_input" value="'+ v +'" style="width: 40px; text-align: center;  margin-right: 3px;"/>';
			$('#inputs').append(elem);
		};
	} else {
		for (var i = 0; i < N; i++) {
			var elem = '<input type="text" class="x_input" value="' + i + '" style="width: 30px; text-align: center;  margin-right: 3px;"/>';
			$('#inputs').append(elem);
		};
	}
}

function read_x_array(n) {
	x_array = [];
	for (i = 0; i < n; i++) {
		var x = $('.x_input').eq(i).val();
		x_array[i] = x;
	}
}

//calculeaza valorile f(x) si s(x)
function calc_y_array(n) {
	y_array = [];
	var expression = $('#expression').val();
	for (i = 0; i < n; i++) {
		x = x_array[i];
		y_array[i] = eval(expression);
	}
}

//functia care deseneaza graficul
function draw_chart(f_data, l_data) {
	var labels = [];
	var i =0;
	$('.x_input').each(function() {
		labels[i] = $(this).val();
		i++;
	});

	var lineChartData = {
		labels : labels,
		datasets : [
			{
				fillColor : "rgba(220,20,20,0.5)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				data : f_data
			},
			{
				fillColor : "rgba(11,187,205,0.5)",
				strokeColor : "rgba(151,187,205,1)",
				pointColor : "rgba(151,187,205,1)",
				pointStrokeColor : "#fff",
				data : l_data
			}
		]
	}

	var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Line(lineChartData);
}

//functie care afiseaza un table de 3 coloane cu vectorii x, y si L(n)
function show_results(element_id, x_array, y_array, l_array) {
	$('#' + element_id).html('');
	var elem = '<table class="table table-striped"><td></td><td>VALORI X</td><td>VALORI Y</td><td>VALORI L(n)</td>';
	for (var i = 0; i <= N; i++) {
		var td_x = '<td>'+x_array[i]+'</td>';
		var td_y = '<td>'+y_array[i]+'</td>';
		var td_l = '<td>'+l_array[i]+'</td>';
		elem += '<tr><td>'+i+'</td>' + td_x + td_y + td_l + '</tr>';
	}
	elem += '</table>';
	$('#' + element_id).html(elem);
}

/*************************************************************************
	Lagrange I
	*************************************************************************/
	function LagrangeFormaI(x) {
		var suma = 0;
		for (var i = 0; i < N; i++) {
			var produs = y_array[i];
			for (var j = 0; j < N; j++) {
				if (i != j) {
					produs *= ( (x - x_array[j]) / (x_array[i] - x_array[j]) );
				}
			}
			suma += produs;
		}
		return suma;
	}


/*************************************************************************
	Lagrange II (fara Aitken)
	*************************************************************************/

	function LagrangeFormaII(x) {
		suma = y_array[0];
		for (var i = 1; i < N; i++) {
			var coeficient = calc_coeficient(i);
			var produs = calc_produs(x, i);
			suma += coeficient * produs;
		}
		return suma;
	}

	//calculeza coeficientul
	function calc_coeficient(k) {
		var suma = 0;
		for (var i = 0; i <= k;  i++) {
			var produs = 1;
			for (var j = 0; j <= k; j++) {
				if (i != j) {
					produs *= (x_array[i] - x_array[j]);
				}
			}
			suma += y_array[i] / produs;
		}
		return suma;
	}

	//calculeaza (x-x0)(x-x1)(x-x2)...
	function calc_produs(x, index) {
		var result = 1;
		for (var i = 0; i < index; i++) {
			result *=  (x - x_array[i]);
		}
		return result;
	}


/*************************************************************************
	Interpolare trigonometrica
*************************************************************************/
//a_array = vectorul de coeficienti ak
//b_array = vectorul de coeficienti bk
trig_T = [];
trig_X = []; //solutia sistemului liniar
trig_a_array = [];
trig_b_array = [];

//genreaza matricea T, sper ca e corect
function trig_genereaza_T() {
	trig_T = [];

	for (var i = 0; i <= N; i++) {
		trig_T[i] = [];

		//trig_T[0][i] = 1;

		for (var k = 0; k <= N; k++) {
			if (k == 0) {
				trig_T[i][k] = 1
			} else {
				if (k % 2 == 1) {
					trig_T[i][k] = Math.sin((k+1)/2 * x_array[i]);
				} else {
					trig_T[i][k] = Math.cos(k/2 * x_array[i]);
				}
			}
		}
	}
}


//calculeaza solutia X
function trig_genereaza_x() {
	trig_X = numeric.solve(trig_T, y_array);
	/*//trig_X = gauss(trig_T);
	trig_X = numeric.dot(pinv(trig_T),y_array);*/
}

//extrage vectorul a din solutia X
function trig_generaza_a() {
	var j = 0;
	for (var i = 0; i <= N; i+=2) {
		trig_a_array[j] = trig_X[i];
		j++;
	}
}

//extrage vectorul b din solutia X
function trig_generaza_b() {
	var j = 0;
	for (var i = 1; i <= N; i+=2) {
		trig_b_array[j] = trig_X[i];
		j++;
	}
}

//calculeaza suma coeficientilor vec A conform formulei
function calc_suma_a(x) {
	var suma = 0;
	for (var k = 0; k < trig_a_array.length; k++) {
		suma += trig_a_array[k] * Math.cos(k*x);
	}
	return suma;
}

//calculeaza suma coeficientilor vec B conform formulei
function calc_suma_b(x) {
	var suma = 0;
	for (var k = 0; k < trig_b_array.length; k++) {
		suma += trig_b_array[k] * Math.sin((k + 1 )*x);
	}
	return suma;
}