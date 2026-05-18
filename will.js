let willLang = "bn";

const willTemplates = {

	bn: {

		will_main: {

			title: "ওসিয়তনামা / শেষ ইচ্ছাপত্র",

			subject: "বিষয়ঃ ওসিয়তনামা / শেষ ইচ্ছাপত্র।",

			body: `

আমি {{name}}, পিতা {{father}}, মাতা {{mother}}, জন্ম তারিখ {{dob}}, জাতীয় পরিচয়পত্র নম্বর {{nid}}, পাসপোর্ট নম্বর {{passport}}, পেশা {{profession}}, বর্তমান ঠিকানা {{presentAddress}}, স্থায়ী ঠিকানা {{permanentAddress}} এর বাসিন্দা।

এই মর্মে সুস্থ মস্তিষ্কে, স্বজ্ঞানে এবং কারও প্ররোচনা ছাড়া আমার এই ওসিয়তনামা প্রদান করছি।

আমি পূর্বে কোনো ওসিয়ত বা ইচ্ছাপত্র করে থাকলে, এই ওসিয়তনামার মাধ্যমে তা সম্পূর্ণরূপে বাতিল ঘোষণা করলাম।

আমার পরিবারের সদস্যগণঃ

স্ত্রী / স্বামীঃ {{spouse}}
পুত্রঃ {{son}}
কন্যাঃ {{daughter}}
অন্যান্য নির্ভরশীলঃ {{dependent}}

আমার মৃত্যুর পর সর্বপ্রথম—

দাফন / সৎকারের খরচ,
আমার সকল বৈধ ঋণ,
বকেয়া কর / জাকাত / দেনা,

আমার সম্পত্তি হতে পরিশোধ করা হবে।

ঋণের বিবরণঃ

পাওনাদারের নামঃ {{creditor}}
টাকার পরিমাণঃ {{debtAmount}}
বিবরণঃ {{debtDetails}}

আমার সম্পত্তির বিবরণঃ

জমিঃ {{land}}
বাড়ি / ফ্ল্যাটঃ {{house}}
ব্যাংক হিসাবঃ {{bank}}
স্বর্ণালংকারঃ {{gold}}
যানবাহনঃ {{vehicle}}
ব্যবসায়িক শেয়ারঃ {{share}}

আমি নিম্নোক্তভাবে আমার সম্পত্তি বণ্টনের ইচ্ছা প্রকাশ করছিঃ

{{distribution}}

আমার মৃত্যুর পর অপ্রাপ্তবয়স্ক সন্তানদের অভিভাবক হিসেবে আমি নিম্নোক্ত ব্যক্তিকে মনোনীত করছিঃ

নামঃ {{guardianName}}
সম্পর্কঃ {{guardianRelation}}
ঠিকানাঃ {{guardianAddress}}

আমার এই ওসিয়তনামা বাস্তবায়নের জন্য আমি নিম্নোক্ত ব্যক্তিকে নির্বাহী হিসেবে নিয়োগ করলামঃ

নামঃ {{executorName}}
পিতার নামঃ {{executorFather}}
ঠিকানাঃ {{executorAddress}}
মোবাইল নম্বরঃ {{executorMobile}}

তিনি আমার সম্পত্তি বণ্টন, ঋণ পরিশোধ ও অন্যান্য আইনগত কাজ সম্পন্ন করবেন।

আমি ঘোষণা করছি যে, এই ওসিয়তনামা আমি সম্পূর্ণ সুস্থ মস্তিষ্কে, স্বেচ্ছায় এবং কোনো চাপ বা প্ররোচনা ছাড়া সম্পাদন করলাম।

			`

		}

	},

	en: {

		will_main: {

			title: "Last Will & Testament",

			subject: "Subject: Last Will & Testament.",

			body: `

I, {{name}}, son/daughter of {{father}} and {{mother}}, date of birth {{dob}}, National ID No {{nid}}, Passport No {{passport}}, profession {{profession}}, present address {{presentAddress}}, permanent address {{permanentAddress}}.

I hereby declare this Last Will while being mentally sound and free from pressure or influence.

Any previous will made by me shall stand cancelled through this document.

My family members are:

Spouse: {{spouse}}
Son: {{son}}
Daughter: {{daughter}}
Dependents: {{dependent}}

After my death, the following shall be paid first:

Funeral expenses,
All lawful debts,
Taxes / Zakat / liabilities.

Debt Details:

Creditor Name: {{creditor}}
Amount: {{debtAmount}}
Details: {{debtDetails}}

Property Details:

Land: {{land}}
House / Flat: {{house}}
Bank Account: {{bank}}
Gold: {{gold}}
Vehicle: {{vehicle}}
Business Share: {{share}}

I wish to distribute my property as follows:

{{distribution}}

Guardian Information:

Name: {{guardianName}}
Relation: {{guardianRelation}}
Address: {{guardianAddress}}

Executor Information:

Name: {{executorName}}
Father Name: {{executorFather}}
Address: {{executorAddress}}
Mobile: {{executorMobile}}

The executor shall complete all legal procedures including debt payment and property distribution.

I declare that this Will has been executed voluntarily and without coercion.

			`

		}

	}

};



function openWillModal() {

	if(typeof setActiveMode === "function") {

		setActiveMode('mode-will-maker');

	}

	document.getElementById('willMakerModal').style.display = 'flex';

	setWillLang(willLang);

}



function closeWillModal() {

	document.getElementById('willMakerModal').style.display = 'none';

}



function setWillLang(lang) {

	willLang = lang;

	document.getElementById('will-btn-bn').classList.toggle('active', lang === 'bn');

	document.getElementById('will-btn-en').classList.toggle('active', lang === 'en');

	const isBN = lang === 'bn';

	document.getElementById('will-ui-title').innerText =
		isBN ? "ওসিয়তনামা / শেষ ইচ্ছাপত্র" : "Last Will & Testament";

	window.currentWillKey = "will_main";

	updateWill();

}



function updateWill() {

	const val = (id) => document.getElementById(id).value;

	const data = willTemplates[willLang][window.currentWillKey];

	const name = val('will-name') || ".......";

	const father = val('will-father') || ".......";

	const mother = val('will-mother') || ".......";

	const dob = val('will-dob') || ".......";

	const nid = val('will-nid') || ".......";

	const passport = val('will-passport') || ".......";

	const profession = val('will-profession') || ".......";

	const presentAddress = val('will-present-address') || ".......";

	const permanentAddress = val('will-permanent-address') || ".......";

	const spouse = val('will-spouse') || ".......";

	const son = val('will-son') || ".......";

	const daughter = val('will-daughter') || ".......";

	const dependent = val('will-dependent') || ".......";

	const creditor = val('will-creditor') || ".......";

	const debtAmount = val('will-debt-amount') || ".......";

	const debtDetails = val('will-debt-details') || ".......";

	const land = val('will-land') || ".......";

	const house = val('will-house') || ".......";

	const bank = val('will-bank') || ".......";

	const gold = val('will-gold') || ".......";

	const vehicle = val('will-vehicle') || ".......";

	const share = val('will-share') || ".......";

	const distribution = val('will-distribution') || ".......";

	const guardianName = val('will-guardian-name') || ".......";

	const guardianRelation = val('will-guardian-relation') || ".......";

	const guardianAddress = val('will-guardian-address') || ".......";

	const executorName = val('will-executor-name') || ".......";

	const executorFather = val('will-executor-father') || ".......";

	const executorAddress = val('will-executor-address') || ".......";

	const executorMobile = val('will-executor-mobile') || ".......";

	const witness1 = val('will-witness1') || ".......";

	const witness2 = val('will-witness2') || ".......";



	let bodyText = data.body

		.replace(/{{name}}/g, `<b>${name}</b>`)

		.replace(/{{father}}/g, `<b>${father}</b>`)

		.replace(/{{mother}}/g, `<b>${mother}</b>`)

		.replace(/{{dob}}/g, `<b>${dob}</b>`)

		.replace(/{{nid}}/g, `<b>${nid}</b>`)

		.replace(/{{passport}}/g, `<b>${passport}</b>`)

		.replace(/{{profession}}/g, `<b>${profession}</b>`)

		.replace(/{{presentAddress}}/g, `<b>${presentAddress}</b>`)

		.replace(/{{permanentAddress}}/g, `<b>${permanentAddress}</b>`)

		.replace(/{{spouse}}/g, `<b>${spouse}</b>`)

		.replace(/{{son}}/g, `<b>${son}</b>`)

		.replace(/{{daughter}}/g, `<b>${daughter}</b>`)

		.replace(/{{dependent}}/g, `<b>${dependent}</b>`)

		.replace(/{{creditor}}/g, `<b>${creditor}</b>`)

		.replace(/{{debtAmount}}/g, `<b>${debtAmount}</b>`)

		.replace(/{{debtDetails}}/g, `<b>${debtDetails}</b>`)

		.replace(/{{land}}/g, `<b>${land}</b>`)

		.replace(/{{house}}/g, `<b>${house}</b>`)

		.replace(/{{bank}}/g, `<b>${bank}</b>`)

		.replace(/{{gold}}/g, `<b>${gold}</b>`)

		.replace(/{{vehicle}}/g, `<b>${vehicle}</b>`)

		.replace(/{{share}}/g, `<b>${share}</b>`)

		.replace(/{{distribution}}/g, `<b>${distribution}</b>`)

		.replace(/{{guardianName}}/g, `<b>${guardianName}</b>`)

		.replace(/{{guardianRelation}}/g, `<b>${guardianRelation}</b>`)

		.replace(/{{guardianAddress}}/g, `<b>${guardianAddress}</b>`)

		.replace(/{{executorName}}/g, `<b>${executorName}</b>`)

		.replace(/{{executorFather}}/g, `<b>${executorFather}</b>`)

		.replace(/{{executorAddress}}/g, `<b>${executorAddress}</b>`)

		.replace(/{{executorMobile}}/g, `<b>${executorMobile}</b>`);



	const html = `

		<div style="font-size:16px; line-height:1.9; color:#000;">

			<h2 style="text-align:center; margin-bottom:25px;">
				${data.title}
			</h2>

			<p>
				<b>${data.subject}</b>
			</p>

			<p style="text-align:justify; white-space:pre-line;">
				${bodyText}
			</p>

			<div style="margin-top:60px;">

				<p>
					${willLang === 'bn' ? 'ওসিয়তকারীর স্বাক্ষর' : 'Signature of Testator'}
				</p>

				<p>

					${willLang === 'bn' ? 'নাম' : 'Name'}:
					${name}

					<br><br>

					${willLang === 'bn' ? 'স্বাক্ষর' : 'Signature'}:
					____________________

				</p>

			</div>

			<div style="margin-top:60px;">

				<p>
					<b>
						${willLang === 'bn' ? 'সাক্ষীগণের স্বাক্ষর' : 'Witness Signatures'}
					</b>
				</p>

				<br>

				<p>

					১.
					${witness1}

					<br><br>

					স্বাক্ষর:
					____________________

				</p>

				<br><br>

				<p>

					২.
					${witness2}

					<br><br>

					স্বাক্ষর:
					____________________

				</p>

			</div>

		</div>

	`;

	document.getElementById('will-render-area').innerHTML = html;

}



function printWill() {

	const printContent = document.getElementById('will-render-area').innerHTML;

	const printWindow = window.open('', '', 'height=800,width=1000');

	printWindow.document.write('<html><head><title>Print Will</title>');

	printWindow.document.write('<link href="https://fonts.maateen.me/solaiman-lipi/font.css" rel="stylesheet">');

	printWindow.document.write('<style>body{margin:0;padding:0;background:#fff;}#wrap{width:210mm;height:auto;padding:25mm;box-sizing:border-box;font-family:"SolaimanLipi",Arial,sans-serif!important;line-height:1.9;}</style></head><body>');

	printWindow.document.write('<div id="wrap">' + printContent + '</div>');

	printWindow.document.write('</body></html>');

	printWindow.document.close();

	setTimeout(() => {

		printWindow.print();

		printWindow.close();

	}, 700);

}



function resetWill() {

	document.querySelectorAll('#will-input-panel input, #will-input-panel textarea')
	.forEach(i => i.value = "");

	updateWill();

}