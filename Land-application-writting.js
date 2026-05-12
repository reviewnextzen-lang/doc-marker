let lawLang = "bn";

const lawTemplates = {

	bn: {

		land_recovery: {

			title: "জবরদখলকৃত জমির দখল পুনরুদ্ধার",

			body: `
			বিনীত নিবেদন এই যে, আমি {{name}}
			পিতা/স্বামী {{father}},
			সাং {{village}},
			ডাকঘর {{post}},
			থানা {{thana}},
			জেলা {{userDistrict}}
			এর স্থায়ী বাসিন্দা।

			আমি বৈধ মালিক হিসেবে নিম্নোক্ত সম্পত্তির মালিকানা ভোগ করে আসছি—

			📍 মৌজা: {{mouza}}
			📍 খতিয়ান নং: {{khatian}}
			📍 দাগ নং: {{dag}}
			📍 জমির পরিমাণ: {{land}} শতক/একর

			উক্ত জমি আমি দীর্ঘদিন যাবৎ শান্তিপূর্ণভাবে ভোগদখল করে আসছিলাম।
			কিন্তু গত {{problemDate}} তারিখে
			{{occupier}} নামীয় ব্যক্তি ও তার সহযোগীরা বেআইনিভাবে
			আমার জমি জবরদখল করে এবং সেখানে নির্মাণ/চাষাবাদ/বেড়া প্রদান শুরু করে।

			আমি বিষয়টি স্থানীয়ভাবে সমাধানের চেষ্টা করলেও
			তারা কোনো সমাধানে আসেনি।
			বর্তমানে আমি আমার বৈধ সম্পত্তি থেকে বঞ্চিত হচ্ছি।

			অতএব, মহোদয়ের নিকট আকুল আবেদন এই যে,
			বিষয়টি তদন্তপূর্বক আমার জমির বৈধ দখল পুনরুদ্ধারে
			প্রয়োজনীয় আইনগত ব্যবস্থা গ্রহণ করে বাধিত করবেন।
			`

		}

	}

};

function openLawModal() {

	if(typeof setActiveMode === "function") {

		setActiveMode('mode-law-maker');

	}

	document.getElementById('landappMakerModal').style.display = 'flex';

	setLawLang(lawLang);

}

function closeLawModal() {

	document.getElementById('landappMakerModal').style.display = 'none';

}

function setLawLang(lang) {

	lawLang = lang;

	document.getElementById('law-btn-bn').classList.toggle('active', lang === 'bn');

	document.getElementById('law-btn-en').classList.toggle('active', lang === 'en');

	const select = document.getElementById('law-template-select');

	select.innerHTML = '';

	const data = lawTemplates[lang];

	for(let key in data) {

		let opt = document.createElement('option');

		opt.value = key;

		opt.innerText = data[key].title;

		select.appendChild(opt);

	}

	applyLawTemplate(select.value);

}

function applyLawTemplate(key) {

	window.currentLawKey = key;

	updateLaw();

}

function updateLaw() {

	const val = (id) => document.getElementById(id).value;

	const data =
		lawTemplates[lawLang][window.currentLawKey];

	const office = val('law-office') || ".......";

	const district = val('law-district') || ".......";

	const name = val('law-name') || ".......";

	const father = val('law-father') || ".......";

	const village = val('law-village') || ".......";

	const post = val('law-post') || ".......";

	const thana = val('law-thana') || ".......";

	const userDistrict = val('law-user-district') || ".......";

	const phone = val('law-phone') || ".......";

	const date = val('law-date') || ".......";

	const mouza = val('law-mouza') || ".......";

	const khatian = val('law-khatian') || ".......";

	const dag = val('law-dag') || ".......";

	const land = val('law-land') || ".......";

	const problemDate = val('law-problem-date') || ".......";

	const occupier = val('law-occupier') || ".......";

	let bodyText = data.body

		.replace(/{{name}}/g, `<b>${name}</b>`)

		.replace(/{{father}}/g, `<b>${father}</b>`)

		.replace(/{{village}}/g, `<b>${village}</b>`)

		.replace(/{{post}}/g, `<b>${post}</b>`)

		.replace(/{{thana}}/g, `<b>${thana}</b>`)

		.replace(/{{userDistrict}}/g, `<b>${userDistrict}</b>`)

		.replace(/{{mouza}}/g, `<b>${mouza}</b>`)

		.replace(/{{khatian}}/g, `<b>${khatian}</b>`)

		.replace(/{{dag}}/g, `<b>${dag}</b>`)

		.replace(/{{land}}/g, `<b>${land}</b>`)

		.replace(/{{problemDate}}/g, `<b>${problemDate}</b>`)

		.replace(/{{occupier}}/g, `<b>${occupier}</b>`);

	const html = `

		<div style="font-size:16px; line-height:1.8; color:#000;">

			<p>
				বরাবর<br>
				মাননীয় উপজেলা নির্বাহী অফিসার / সহকারী কমিশনার (ভূমি)<br>
				${office} উপজেলা, ${district} জেলা।
			</p>

			<p>
				<b>
					বিষয়ঃ জবরদখলকৃত জমির দখল পুনরুদ্ধারের আবেদন।
				</b>
			</p>

			<p>
				জনাব,
			</p>

			<p style="text-align:justify;">
				${bodyText}
			</p>

			<div style="margin-top:60px;">

				<p>
					নিবেদক
				</p>

				<p>
					নাম: ${name}<br>
					স্বাক্ষর: ____________________<br>
					মোবাইল: ${phone}<br>
					তারিখ: ${date}
				</p>

			</div>

		</div>

	`;

	document.getElementById('law-render-area').innerHTML = html;

}

function printLaw() {

	const printContent = document.getElementById('law-render-area').innerHTML;

	const printWindow = window.open('', '', 'height=800,width=1000');

	printWindow.document.write('<html><head><title>Print Land Application</title>');

	printWindow.document.write('<link href="https://fonts.maateen.me/solaiman-lipi/font.css" rel="stylesheet">');

	printWindow.document.write('<style>body{margin:0;padding:0;background:#fff;}#wrap{width:210mm;height:297mm;padding:25mm;box-sizing:border-box;font-family:"SolaimanLipi",Arial,sans-serif!important;}</style></head><body>');

	printWindow.document.write('<div id="wrap">' + printContent + '</div>');

	printWindow.document.write('</body></html>');

	printWindow.document.close();

	setTimeout(() => {

		printWindow.print();

		printWindow.close();

	}, 700);

}

function resetLaw() {

	document.querySelectorAll('#law-input-panel input')
	.forEach(i => i.value = "");

	updateLaw();

}