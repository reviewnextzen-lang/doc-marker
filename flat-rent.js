let tenantLang = "bn";

const tenantTemplates = {

	bn: {

		tenant_main: {

			title: "ভাড়াটিয়ার তথ্য ফরম",

			subject: "বিষয়ঃ ভাড়াটিয়ার তথ্য ফরম।",

			body: `

<div style="margin-top:15px;">

<h3 style="margin-top:20px;">১. বাড়ির মালিকের তথ্য</h3>

<p>
মালিকের নামঃ <b>{{ownerName}}</b><br>
পিতার নামঃ <b>{{ownerFather}}</b><br>
মোবাইল নম্বরঃ <b>{{ownerMobile}}</b><br>
NID নম্বরঃ <b>{{ownerNid}}</b><br>
বর্তমান ঠিকানাঃ <b>{{ownerAddress}}</b>
</p>

<h3 style="margin-top:25px;">২. ভাড়াটিয়ার ব্যক্তিগত তথ্য</h3>

<p>
ভাড়াটিয়ার নামঃ <b>{{tenantName}}</b><br>
পিতার নামঃ <b>{{tenantFather}}</b><br>
মাতার নামঃ <b>{{tenantMother}}</b><br>
স্বামী / স্ত্রীর নামঃ <b>{{tenantSpouse}}</b><br>
জন্ম তারিখঃ <b>{{tenantDob}}</b><br>
NID নম্বরঃ <b>{{tenantNid}}</b><br>
পাসপোর্ট নম্বরঃ <b>{{tenantPassport}}</b><br>
মোবাইল নম্বরঃ <b>{{tenantMobile}}</b><br>
ইমেইলঃ <b>{{tenantEmail}}</b><br>
পেশাঃ <b>{{tenantProfession}}</b><br>
কর্মস্থলের নামঃ <b>{{tenantOffice}}</b><br>
অফিসের ঠিকানাঃ <b>{{tenantOfficeAddress}}</b><br>
অফিস ফোন নম্বরঃ <b>{{tenantOfficePhone}}</b><br>
স্থায়ী ঠিকানাঃ <b>{{tenantPermanent}}</b><br>
বর্তমান ঠিকানাঃ <b>{{tenantPresent}}</b><br>
শিক্ষাগত যোগ্যতাঃ <b>{{tenantEducation}}</b>
</p>

<h3 style="margin-top:25px;">৩. পরিবারের সদস্যদের তথ্য</h3>

<p>
<b>{{familyInfo}}</b>
</p>

<h3 style="margin-top:25px;">৪. জরুরি যোগাযোগের তথ্য</h3>

<p>
নামঃ <b>{{emergencyName}}</b><br>
সম্পর্কঃ <b>{{emergencyRelation}}</b><br>
মোবাইল নম্বরঃ <b>{{emergencyMobile}}</b><br>
ঠিকানাঃ <b>{{emergencyAddress}}</b>
</p>

<h3 style="margin-top:25px;">৫. পূর্ববর্তী বাসস্থানের তথ্য</h3>

<p>
পূর্ববর্তী বাসার ঠিকানাঃ <b>{{previousAddress}}</b><br>
বাড়িওয়ালার নামঃ <b>{{previousOwner}}</b><br>
বাড়িওয়ালার মোবাইল নম্বরঃ <b>{{previousOwnerMobile}}</b><br>
কতদিন বসবাস করেছেনঃ <b>{{stayDuration}}</b><br>
বাসা ছাড়ার কারণঃ <b>{{leaveReason}}</b>
</p>

<h3 style="margin-top:25px;">৬. ভাড়ার তথ্য</h3>

<p>
বাসা / ফ্ল্যাট নম্বরঃ <b>{{flatNumber}}</b><br>
তলার নাম্বারঃ <b>{{floorNumber}}</b><br>
কক্ষ সংখ্যাঃ <b>{{roomCount}}</b><br>
ভাড়া শুরু হওয়ার তারিখঃ <b>{{rentStart}}</b><br>
মাসিক ভাড়াঃ <b>{{monthlyRent}}</b><br>
অগ্রিম / ডিপোজিটঃ <b>{{deposit}}</b><br>
বিদ্যুৎ বিল পদ্ধতিঃ <b>{{electricBill}}</b><br>
গ্যাস বিলঃ <b>{{gasBill}}</b><br>
পানি বিলঃ <b>{{waterBill}}</b><br>
সার্ভিস চার্জঃ <b>{{serviceCharge}}</b><br>
চুক্তির মেয়াদঃ <b>{{agreementDuration}}</b>
</p>

<h3 style="margin-top:25px;">৭. প্রয়োজনীয় ডকুমেন্ট</h3>

<p>
☑ জাতীয় পরিচয়পত্রের ফটোকপি<br>
☑ পাসপোর্ট সাইজ ছবি<br>
☑ অফিস আইডি কার্ড কপি<br>
☑ পুলিশ ভেরিফিকেশন কপি<br>
☑ পাসপোর্ট কপি (যদি থাকে)
</p>

<h3 style="margin-top:25px;">৮. বিশেষ তথ্য</h3>

<p>
মোট কতজন থাকবেনঃ <b>{{totalMember}}</b><br>
পোষা প্রাণী আছেঃ <b>{{petInfo}}</b><br>
গাড়ি / মোটরসাইকেল নম্বরঃ <b>{{vehicleNumber}}</b><br>
ড্রাইভারের তথ্যঃ <b>{{driverInfo}}</b><br>
গৃহকর্মীর তথ্যঃ <b>{{maidInfo}}</b>
</p>

<h3 style="margin-top:25px;">৯. ঘোষণা</h3>

<p>
আমি অঙ্গীকার করছি যে, উপরে প্রদত্ত সকল তথ্য সঠিক ও সত্য। কোনো তথ্য গোপন বা মিথ্যা প্রমাণিত হলে বাড়ির মালিক প্রয়োজনীয় ব্যবস্থা গ্রহণ করতে পারবেন।
</p>

</div>

			`

		}

	}

};



function openTenantModal() {

	if(typeof setActiveMode === "function") {

		setActiveMode('mode-tenant-maker');

	}

	document.getElementById('tenantMakerModal').style.display = 'flex';

	setTenantLang(tenantLang);

}



function closeTenantModal() {

	document.getElementById('tenantMakerModal').style.display = 'none';

}



function setTenantLang(lang) {

	tenantLang = lang;

	window.currentTenantKey = "tenant_main";

	updateTenant();

}



function updateTenant() {

	const val = (id) => document.getElementById(id).value;

	const data = tenantTemplates[tenantLang][window.currentTenantKey];



	const ownerName = val('tenant-owner-name') || ".......";
	const ownerFather = val('tenant-owner-father') || ".......";
	const ownerMobile = val('tenant-owner-mobile') || ".......";
	const ownerNid = val('tenant-owner-nid') || ".......";
	const ownerAddress = val('tenant-owner-address') || ".......";

	const tenantName = val('tenant-name') || ".......";
	const tenantFather = val('tenant-father') || ".......";
	const tenantMother = val('tenant-mother') || ".......";
	const tenantSpouse = val('tenant-spouse') || ".......";
	const tenantDob = val('tenant-dob') || ".......";
	const tenantNid = val('tenant-nid') || ".......";
	const tenantPassport = val('tenant-passport') || ".......";
	const tenantMobile = val('tenant-mobile') || ".......";
	const tenantEmail = val('tenant-email') || ".......";
	const tenantProfession = val('tenant-profession') || ".......";
	const tenantOffice = val('tenant-office') || ".......";
	const tenantOfficeAddress = val('tenant-office-address') || ".......";
	const tenantOfficePhone = val('tenant-office-phone') || ".......";
	const tenantPermanent = val('tenant-permanent') || ".......";
	const tenantPresent = val('tenant-present') || ".......";
	const tenantEducation = val('tenant-education') || ".......";

	const familyInfo = val('tenant-family-info') || ".......";

	const emergencyName = val('tenant-emergency-name') || ".......";
	const emergencyRelation = val('tenant-emergency-relation') || ".......";
	const emergencyMobile = val('tenant-emergency-mobile') || ".......";
	const emergencyAddress = val('tenant-emergency-address') || ".......";

	const previousAddress = val('tenant-previous-address') || ".......";
	const previousOwner = val('tenant-previous-owner') || ".......";
	const previousOwnerMobile = val('tenant-previous-owner-mobile') || ".......";
	const stayDuration = val('tenant-stay-duration') || ".......";
	const leaveReason = val('tenant-leave-reason') || ".......";

	const flatNumber = val('tenant-flat-number') || ".......";
	const floorNumber = val('tenant-floor-number') || ".......";
	const roomCount = val('tenant-room-count') || ".......";
	const rentStart = val('tenant-rent-start') || ".......";
	const monthlyRent = val('tenant-monthly-rent') || ".......";
	const deposit = val('tenant-deposit') || ".......";
	const electricBill = val('tenant-electric-bill') || ".......";
	const gasBill = val('tenant-gas-bill') || ".......";
	const waterBill = val('tenant-water-bill') || ".......";
	const serviceCharge = val('tenant-service-charge') || ".......";
	const agreementDuration = val('tenant-agreement-duration') || ".......";

	const totalMember = val('tenant-total-member') || ".......";
	const petInfo = val('tenant-pet-info') || ".......";
	const vehicleNumber = val('tenant-vehicle-number') || ".......";
	const driverInfo = val('tenant-driver-info') || ".......";
	const maidInfo = val('tenant-maid-info') || ".......";



	let bodyText = data.body

		.replace(/{{ownerName}}/g, `<b>${ownerName}</b>`)
		.replace(/{{ownerFather}}/g, `<b>${ownerFather}</b>`)
		.replace(/{{ownerMobile}}/g, `<b>${ownerMobile}</b>`)
		.replace(/{{ownerNid}}/g, `<b>${ownerNid}</b>`)
		.replace(/{{ownerAddress}}/g, `<b>${ownerAddress}</b>`)

		.replace(/{{tenantName}}/g, `<b>${tenantName}</b>`)
		.replace(/{{tenantFather}}/g, `<b>${tenantFather}</b>`)
		.replace(/{{tenantMother}}/g, `<b>${tenantMother}</b>`)
		.replace(/{{tenantSpouse}}/g, `<b>${tenantSpouse}</b>`)
		.replace(/{{tenantDob}}/g, `<b>${tenantDob}</b>`)
		.replace(/{{tenantNid}}/g, `<b>${tenantNid}</b>`)
		.replace(/{{tenantPassport}}/g, `<b>${tenantPassport}</b>`)
		.replace(/{{tenantMobile}}/g, `<b>${tenantMobile}</b>`)
		.replace(/{{tenantEmail}}/g, `<b>${tenantEmail}</b>`)
		.replace(/{{tenantProfession}}/g, `<b>${tenantProfession}</b>`)
		.replace(/{{tenantOffice}}/g, `<b>${tenantOffice}</b>`)
		.replace(/{{tenantOfficeAddress}}/g, `<b>${tenantOfficeAddress}</b>`)
		.replace(/{{tenantOfficePhone}}/g, `<b>${tenantOfficePhone}</b>`)
		.replace(/{{tenantPermanent}}/g, `<b>${tenantPermanent}</b>`)
		.replace(/{{tenantPresent}}/g, `<b>${tenantPresent}</b>`)
		.replace(/{{tenantEducation}}/g, `<b>${tenantEducation}</b>`)

		.replace(/{{familyInfo}}/g, `<b>${familyInfo}</b>`)

		.replace(/{{emergencyName}}/g, `<b>${emergencyName}</b>`)
		.replace(/{{emergencyRelation}}/g, `<b>${emergencyRelation}</b>`)
		.replace(/{{emergencyMobile}}/g, `<b>${emergencyMobile}</b>`)
		.replace(/{{emergencyAddress}}/g, `<b>${emergencyAddress}</b>`)

		.replace(/{{previousAddress}}/g, `<b>${previousAddress}</b>`)
		.replace(/{{previousOwner}}/g, `<b>${previousOwner}</b>`)
		.replace(/{{previousOwnerMobile}}/g, `<b>${previousOwnerMobile}</b>`)
		.replace(/{{stayDuration}}/g, `<b>${stayDuration}</b>`)
		.replace(/{{leaveReason}}/g, `<b>${leaveReason}</b>`)

		.replace(/{{flatNumber}}/g, `<b>${flatNumber}</b>`)
		.replace(/{{floorNumber}}/g, `<b>${floorNumber}</b>`)
		.replace(/{{roomCount}}/g, `<b>${roomCount}</b>`)
		.replace(/{{rentStart}}/g, `<b>${rentStart}</b>`)
		.replace(/{{monthlyRent}}/g, `<b>${monthlyRent}</b>`)
		.replace(/{{deposit}}/g, `<b>${deposit}</b>`)
		.replace(/{{electricBill}}/g, `<b>${electricBill}</b>`)
		.replace(/{{gasBill}}/g, `<b>${gasBill}</b>`)
		.replace(/{{waterBill}}/g, `<b>${waterBill}</b>`)
		.replace(/{{serviceCharge}}/g, `<b>${serviceCharge}</b>`)
		.replace(/{{agreementDuration}}/g, `<b>${agreementDuration}</b>`)

		.replace(/{{totalMember}}/g, `<b>${totalMember}</b>`)
		.replace(/{{petInfo}}/g, `<b>${petInfo}</b>`)
		.replace(/{{vehicleNumber}}/g, `<b>${vehicleNumber}</b>`)
		.replace(/{{driverInfo}}/g, `<b>${driverInfo}</b>`)
		.replace(/{{maidInfo}}/g, `<b>${maidInfo}</b>`);



	const html = `

		<div style="font-size:16px; line-height:1.9; color:#000;">

			<h2 style="text-align:center; margin-bottom:25px; font-size:28px;">
				${data.title}
			</h2>

			<div style="text-align:justify; line-height:1.9;">
				${bodyText}
			</div>

			<div style="margin-top:60px;">

				<p>

					ভাড়াটিয়ার স্বাক্ষর:
					____________________

					<br><br>

					তারিখ:
					____________________

				</p>

			</div>

			<div style="margin-top:60px;">

				<p>

					বাড়ির মালিকের স্বাক্ষর:
					____________________

					<br><br>

					তারিখ:
					____________________

				</p>

			</div>

		</div>

	`;

	document.getElementById('tenant-render-area').innerHTML = html;

}



function printTenant() {

	const printContent = document.getElementById('tenant-render-area').innerHTML;

	const printWindow = window.open('', '', 'height=800,width=1000');

	printWindow.document.write('<html><head><title>Print Tenant Form</title>');

	printWindow.document.write('<link href="https://fonts.maateen.me/solaiman-lipi/font.css" rel="stylesheet">');

	printWindow.document.write('<style>body{margin:0;padding:0;background:#fff;}#wrap{width:210mm;min-height:297mm;padding:20mm;box-sizing:border-box;font-family:"SolaimanLipi",Arial,sans-serif!important;line-height:1.9;color:#000;}h2,h3{text-align:left;}p{text-align:justify;}</style></head><body>');

	printWindow.document.write('<div id="wrap">' + printContent + '</div>');

	printWindow.document.write('</body></html>');

	printWindow.document.close();

	setTimeout(() => {

		printWindow.print();

		printWindow.close();

	}, 700);

}



function resetTenant() {

	document.querySelectorAll('#tenant-input-panel input, #tenant-input-panel textarea')
	.forEach(i => i.value = "");

	updateTenant();

}