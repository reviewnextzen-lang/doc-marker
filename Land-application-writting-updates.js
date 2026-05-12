let lawLang = "bn";

const lawTemplates = {

	bn: {

		land_recovery: {

			title: "জবরদখলকৃত জমির দখল পুনরুদ্ধার",

			subject: "বিষয়ঃ জবরদখলকৃত জমির দখল পুনরুদ্ধারের আবেদন।",

			body: `
বিনীত নিবেদন এই যে, আমি {{name}} পিতা/স্বামী {{father}}, সাং {{village}}, ডাকঘর {{post}}, থানা {{thana}}, জেলা {{userDistrict}} এর স্থায়ী বাসিন্দা।

আমি বৈধ মালিক হিসেবে নিম্নোক্ত সম্পত্তির মালিকানা ভোগ করে আসছি—

 মৌজা: {{mouza}}
 খতিয়ান নং: {{khatian}}
 দাগ নং: {{dag}}
 জমির পরিমাণ: {{land}}

উক্ত জমি আমি দীর্ঘদিন যাবৎ শান্তিপূর্ণভাবে ভোগদখল করে আসছিলাম। কিন্তু গত {{problemDate}} তারিখে {{occupier}}, পিতা {{occupierFather}}, সাং {{occupierVillage}}, ডাকঘর {{occupierPost}}, থানা {{occupierThana}}, জেলা {{occupierDistrict}} ব্যক্তি ও তার সহযোগীরা বেআইনিভাবে আমার জমি জবরদখল করে এবং সেখানে {{occupationType}} শুরু করে।

আমি বিষয়টি স্থানীয়ভাবে সমাধানের চেষ্টা করলেও তারা কোনো সমাধানে আসেনি। বর্তমানে আমি আমার বৈধ সম্পত্তি থেকে বঞ্চিত হচ্ছি।


অতএব, মহোদয়ের নিকট আকুল আবেদন এই যে, বিষয়টি তদন্তপূর্বক আমার জমির বৈধ দখল পুনরুদ্ধারে প্রয়োজনীয় আইনগত ব্যবস্থা গ্রহণ করে বাধিত করবেন।
`

		}

	},

	en: {

		land_recovery: {

			title: "Land Possession Recovery",

			subject: "Subject: Application for Recovery of Illegal Land Possession.",

			body: `
I, {{name}}, son/husband of {{father}}, village {{village}}, post office {{post}}, police station {{thana}}, district {{userDistrict}}, am a permanent resident.

I am the lawful owner of the following property:

Mouza: {{mouza}}
Khatian No: {{khatian}}
Dag No: {{dag}}
Land Amount: {{land}}

I have been peacefully possessing the land for a long time.

But on {{problemDate}}, {{occupier}}, son of {{occupierFather}}, village {{occupierVillage}}, post office {{occupierPost}}, police station {{occupierThana}}, district {{occupierDistrict}} illegally occupied my land and started {{occupationType}} there.

Although I tried to solve the matter locally, they did not agree to any settlement. Currently I am being deprived of my lawful property.

Therefore, I sincerely request you to investigate the matter and take necessary legal action to restore my lawful possession of the land.
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

	const isBN = lang === 'bn';

	document.getElementById('law-ui-title').innerText =
		isBN ? "ভূমি আবেদন রাইটিং" : "Land Application Writing";

	document.getElementById('lbl-law-temp').innerText =
		isBN ? "আবেদনের বিষয় নির্বাচন করুন" : "Select Application Subject";

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

	const data = lawTemplates[lawLang][window.currentLawKey];

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

	const occupierFather = val('law-occupier-father') || ".......";

	const occupierVillage = val('law-occupier-village') || ".......";

	const occupierPost = val('law-occupier-post') || ".......";

	const occupierThana = val('law-occupier-thana') || ".......";

	const occupierDistrict = val('law-occupier-district') || ".......";

	const occupationType = val('law-occupation-type') || ".......";

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

		.replace(/{{occupier}}/g, `<b>${occupier}</b>`)

		.replace(/{{occupierFather}}/g, `<b>${occupierFather}</b>`)

		.replace(/{{occupierVillage}}/g, `<b>${occupierVillage}</b>`)

		.replace(/{{occupierPost}}/g, `<b>${occupierPost}</b>`)

		.replace(/{{occupierThana}}/g, `<b>${occupierThana}</b>`)

		.replace(/{{occupierDistrict}}/g, `<b>${occupierDistrict}</b>`)

		.replace(/{{occupationType}}/g, `<b>${occupationType}</b>`);

	const html = `

		<div style="font-size:16px; line-height:1.8; color:#000;">

			<p>
				${lawLang === 'bn' ? 'তারিখ:' : 'Date:'}
				${date}
			</p>

			<p>

				${lawLang === 'bn'
					? 'বরাবর,<br>মাননীয় উপজেলা নির্বাহী অফিসার / সহকারী কমিশনার (ভূমি)'
					: 'To,<br>The Upazila Executive Officer / Assistant Commissioner (Land)'
				}

				<br>

				${office}
				${lawLang === 'bn' ? 'উপজেলা' : 'Upazila'},

				${district}
				${lawLang === 'bn' ? 'জেলা' : 'District'}

			</p>

			<p>
				<b>${data.subject}</b>
			</p>

			<p>
				${lawLang === 'bn' ? 'জনাব,' : 'Sir,'}
			</p>

			<p style="text-align:justify;">
				${bodyText}
			</p>

			<div style="margin-top:60px;">

				<p>
					${lawLang === 'bn' ? 'নিবেদক' : 'Applicant'}
				</p>

				<p>

					${lawLang === 'bn' ? 'নাম' : 'Name'}:
					${name}<br>

					${lawLang === 'bn' ? 'স্বাক্ষর' : 'Signature'}:
					____________________<br>

					${lawLang === 'bn' ? 'মোবাইল' : 'Mobile'}:
					${phone}

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
