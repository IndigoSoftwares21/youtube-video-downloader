
const express = require ('express');
const app = express();
const ytdl = require("ytdl-core");
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', (req,res)=>{
  res.render('index')
})

app.get("/download", async (req, res) => {
	const v_id = req.query.url.split('v=')[1];
    const info = await ytdl.getInfo(req.query.url);
  

	return res.render("download", {
		url: "https://www.youtube.com/embed/" + v_id,
        info: info.formats.sort((a, b) => {
            return a.mimeType < b.mimeType;
        }),
	});
});

app.use('/public', express.static('public'));

app.listen(port, ()=>{
  console.log(`Server Started`);
});

