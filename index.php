<!DOCTYPE html>
<html>
<head>
	<?php include 'layout/head.php'; ?>
</head>
<body>
	<?php include 'layout/header.php'; ?>
	<div class="container">
		<div class="row">
			<div class="col-md-3"><strong>Polinom input:</strong></div>
			<div class="col-md-9"><input type="text" style="width: 200px;" class="form-control" id="expression" value="3*x*x + 5 * x + 2"></div>

			<div class="col-md-3"><strong>No of inputs for x:</strong></div>
			<div class="col-md-9"><input type="text" style="width: 200px;"  class="form-control" id="bigN" value="20"></div>

			<div class="col-md-6"><button type="button" id="draw_inputs" class="btn btn-primary">Generate input array</button></div>
			<div class="col-md-12" id="inputs" style="margin-top: 20px; margin-bottom: 20px;"></div>

		</div>
		<div class="container">
			<div class="row">
				<div class="col-md-6">
					<ul class="nav nav-tabs">
						<li class="active"><a href="#home" data-toggle="tab">Lagrange I</a></li>
						<li><a href="#profile" data-toggle="tab">Lagrange II</a></li>
						<li><a href="#messages" data-toggle="tab">Trigonometric</a></li>
					</ul>
					<div class="tab-content">
						<div class="tab-pane active" id="home">
						<h1><button type="button" id="calculate_L1" class="btn btn-primary">Calculeaza</button></h1>
						<div id="lagrange_table_1"></div>
						</div>
						<div class="tab-pane" id="profile">
						<h1><button type="button" id="calculate_L2" class="btn btn-primary">Calculeaza</button></h1>
						<div id="lagrange_table_2"></div>
						</div>
						<div class="tab-pane" id="messages">
						<h1><button type="button" id="calculate_T" class="btn btn-primary">Calculeaza</button></h1>
						<div id="trig_table"></div>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<canvas id="canvas" height="450" width="600"></canvas>
				</div>
			</div>
		</div>
	</div>
</body>
</html>