const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/home-budget');

const AutoIncrementSchema = mongoose.Schema({
	_id: { type: String, required: true },
	seq: { type: Number, default: 0 }
});

const AutoIncrement = mongoose.model('AutoIncrement', AutoIncrementSchema);

const MovementSchema = new mongoose.Schema({
	createdAt: {type: Date, required: true, default: Date.now},
	amount: {type: Number, required: true, default: 0},
	description: {type: String, required: true}
});

MovementSchema.pre('save', function (next) {
	var doc = this;
	AutoIncrement.findByIdAndUpdate({ _id: 'movement' }, { $inc: { seq: 1 } }, { upsert: true }, function (error, counter) {
		if (error)
			return next(error);
		doc.id = (counter) ? counter.seq : 1;
		next();
	});
});

const Movement = mongoose.model('Movement', MovementSchema);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


app.get('/api/hello', (req, res) => {
	res.send({ express: 'Hello From Express' });
});

app.get('/api/v1/movements', async (req, res) => {
	let movements = await Movement.find().exec();
	res.status(200).json({ payload: movements });
});

app.post('/api/v1/movement', async (req, res) => {
	let m = new Movement(req.body);
	await m.save();
	res.status(400).json(m);
});


app.listen(port, () => console.log(`Listening on port ${port}`));