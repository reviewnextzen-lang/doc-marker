let landLang = "bn";

const landTemplates = {

    bn: {

        mutation: {
            title: "নামজারি আবেদন",
            body: "আমি নিম্নস্বাক্ষরকারী এই মর্মে জানাচ্ছি যে, আমার ক্রয়কৃত/উত্তরাধিকার সূত্রে প্রাপ্ত জমির নামজারি করার জন্য আবেদন করিতেছি। জমির বিবরণ: {{desc}}। জমির অবস্থান: {{place}}।"
        },

        correction: {
            title: "খতিয়ান সংশোধন আবেদন",
            body: "আমি নিম্নস্বাক্ষরকারী এই মর্মে জানাচ্ছি যে, আমার জমির খতিয়ানে ভুল তথ্য রয়েছে। উক্ত তথ্য সংশোধনের জন্য আবেদন করিতেছি। জমির বিবরণ: {{desc}}।"
        },

        ownership: {
            title: "মালিকানা আবেদন",
            body: "আমি নিম্নস্বাক্ষরকারী এই মর্মে জানাচ্ছি যে, নিম্নবর্ণিত জমির মালিকানা প্রমাণের জন্য আবেদন করিতেছি। জমির বিবরণ: {{desc}}।"
        },

        land_tax: {
            title: "খাজনা সংক্রান্ত আবেদন",
            body: "আমি নিম্নস্বাক্ষরকারী এই মর্মে জানাচ্ছি যে, আমার জমির খাজনা সংক্রান্ত সমস্যার সমাধানের জন্য আবেদন করিতেছি। জমির বিবরণ: {{desc}}।"
        }

    },

    en: {

        mutation: {
            title: "Land Mutation Application",
            body: "I, the undersigned, request mutation of my land ownership. Land Details: {{desc}}. Location: {{place}}."
        },

        correction: {
            title: "Khatian Correction Application",
            body: "I request correction of wrong information in my land record. Details: {{desc}}."
        },

        ownership: {
            title: "Land Ownership Application",
            body: "I request verification of ownership of the following land. Details: {{desc}}."
        },

        land_tax: {
            title: "Land Tax Application",
            body: "I request resolution regarding land tax issues. Details: {{desc}}."
        }

    }

};


function setLandLang(lang){

    landLang = lang;

    document.getElementById('lam-btn-bn')
        .classList.toggle('active', lang === 'bn');

    document.getElementById('lam-btn-en')
        .classList.toggle('active', lang === 'en');

    const isBN = lang === 'bn';

    document.getElementById('lam-ui-title').innerText =
        isBN ? "জমির আবেদন রাইটিং" : "Land Application Writing";

    const select = document.getElementById('lam-template-select');

    select.innerHTML = '';

    const data = landTemplates[lang];

    for(let key in data){

        let opt = document.createElement('option');

        opt.value = key;

        opt.innerText = data[key].title;

        select.appendChild(opt);

    }

    applyLandTemplate(select.value);

}

function applyLandTemplate(key){

    window.currentLandKey = key;

    updateLand();

}

function toLandN(n){

    if(landLang !== 'bn') return n;

    const d = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];

    return n.toString().replace(/\d/g, x => d[x]);

}

function updateLand(){

    const val = (id) => document.getElementById(id).value;

    const data =
        landTemplates[landLang][window.currentLandKey]
        || landTemplates[landLang]['mutation'];

    const office = val('lam-office-name') || ".......";
    const date = val('lam-date') || "01/01/2026";
    const name = val('lam-name') || ".......";
    const father = val('lam-father') || ".......";
    const phone = val('lam-phone') || ".......";
    const addr = val('lam-address') || ".......";
    const place = val('lam-land-location') || ".......";
    const area = val('lam-land-area') || ".......";
    const desc = val('lam-land-desc') || ".......";

    let bodyText = data.body

        .replace(/{{place}}/g, `<b>${place}</b>`)
        .replace(/{{desc}}/g, `<b>${desc}</b>`);

    const html = `

        <div style="font-size:16px; line-height:1.8; color:#000;">

            <p>
                ${landLang === 'bn' ? 'তারিখ:' : 'Date:'}
                ${toLandN(date)}
            </p>

            <p>
                ${landLang === 'bn'
                    ? 'বরাবর,<br>ভূমি কর্মকর্তা'
                    : 'To,<br>Land Officer'}
                <br>

                ${office}
            </p>

            <p>
                <b>
                    ${landLang === 'bn'
                        ? 'বিষয়: জমি সংক্রান্ত আবেদন।'
                        : 'Subject: Land Related Application'}
                </b>
            </p>

            <p>
                ${landLang === 'bn' ? 'জনাব,' : 'Sir,'}
            </p>

            <p style="text-align:justify;">
                ${bodyText}
            </p>

            <p style="margin-top:25px;">

                ${landLang === 'bn'
                    ? 'আবেদনকারীর তথ্য:'
                    : "Applicant Information:"}
                <br>

                ${landLang === 'bn' ? 'নাম:' : 'Name:'}
                ${name}
                <br>

                ${landLang === 'bn' ? 'পিতা:' : 'Father:'}
                ${father}
                <br>

                ${landLang === 'bn' ? 'ঠিকানা:' : 'Address:'}
                ${addr}
                <br>

                ${landLang === 'bn' ? 'জমির পরিমাণ:' : 'Land Area:'}
                ${area}

            </p>

            <div style="margin-top:60px;">

                <p>
                    ${landLang === 'bn'
                        ? 'বিনীত নিবেদক,'
                        : 'Sincerely Yours,'}
                </p>

                <br>

                <p>
                    ____________________<br>

                    (${name})<br>

                    ${landLang === 'bn'
                        ? 'মোবাইল:'
                        : 'Mobile:'}

                    ${toLandN(phone)}

                </p>

            </div>

        </div>

    `;

    document.getElementById('lam-render-area').innerHTML = html;

}

function printLand(){

    const printContent =
        document.getElementById('lam-render-area').innerHTML;

    const printWindow =
        window.open('', '', 'height=800,width=1000');

    printWindow.document.write(`
        <html>
        <head>

            <title>Print Land Application</title>

            <link href="https://fonts.maateen.me/solaiman-lipi/font.css"
                  rel="stylesheet">

            <style>

                body{
                    margin:0;
                    padding:0;
                    background:#fff;
                }

                #wrap{
                    width:210mm;
                    height:297mm;
                    padding:25mm;
                    box-sizing:border-box;
                    font-family:"SolaimanLipi",Arial,sans-serif !important;
                }

            </style>

        </head>

        <body>

            <div id="wrap">
                ${printContent}
            </div>

        </body>
        </html>
    `);

    printWindow.document.close();

    setTimeout(() => {

        printWindow.print();

        printWindow.close();

    }, 700);

}

function resetLand(){

    document.querySelectorAll(
        '#lam-input-panel input, #lam-input-panel textarea'
    ).forEach(i => i.value = "");

    updateLand();

}
