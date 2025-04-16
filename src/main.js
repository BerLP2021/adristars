import './styles/style.css';
import './styles/header.css';
import './styles/breadcrumbs.css';
import './styles/footer.css';
import './styles/cta.css';
import './styles/product.css';

//popover for header menu
const popover = document.getElementById('my-popover');
popover.addEventListener('beforetoggle', (event) => {
    if (event.newState === 'open') {
        document.body.classList.add('popover-open');
    } else if (event.newState === 'closed') {
        document.body.classList.remove('popover-open');
    }
});

//handle insurance change by Enter
document.querySelectorAll('.insurance_plan input[type="radio"]').forEach((radio) => {
    radio.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            radio.checked = true;
        }
    });
});

//item styling for included extras
const styleIncludedExtras = () => {
    const includedExtras = document.querySelectorAll(
        '.product_extras .option_item[data-included="true"]',
    );
    if (includedExtras.length === 0) return;
    includedExtras.forEach((item) => {
        item.classList.add('option_item__active');
        const svgUse = item.querySelector('.option_btn use');
        const newSrc = svgUse.getAttribute('href').split('#')[0].concat('#', 'minus');
        svgUse.setAttribute('href', newSrc);
        item.style.pointerEvents = 'none';
    });
};
styleIncludedExtras();

var totalAmount = 0;

//handling extras change
{
    const extrasContainer = document.querySelector('.extras_options');
    extrasContainer.addEventListener('change', function (event) {
        const input = event.target;
        if (input.matches('.option_item input')) {
            const btn = input.closest('.option_item');
            const svgUse = btn.querySelector('.option_btn use');
            const svgSrc = svgUse.getAttribute('href');
            const isChecked = input.checked;
            const newSrc = svgSrc.split('#')[0].concat('#', isChecked ? 'minus' : 'plus');

            svgUse.setAttribute('href', newSrc);
            btn.classList.toggle('option_item__active');
            updateExtrasList(input.id);
            updateTotal();
        }
    });
    function updateExtrasList(id) {
        const extrasItem = document.querySelector('#' + id).parentElement;
        if (!extrasItem) return;

        const extrasInput = extrasItem.querySelector('.option_title').textContent;
        const extrasFee = extrasItem.querySelector('.option_price').textContent;

        const addNewExtras = (title, fee, parent) => {
            const feeAsNumber = parseFloat(fee.replace(/[^\d,]/g, '').replace(',', '.'));
            if (Number.isNaN(feeAsNumber)) return;
            const newExtras = document.createElement('li');
            newExtras.className = 'form_summary-item';
            newExtras.innerHTML = `
            <div class="form_summary-title">${title}</div>
            <div class="form_summary-value">
                <span class="extras-price">${fee}</span>
            </div>
        `;
            parent.appendChild(newExtras);
        };

        let formSummaryExtras = document.querySelector('#extras-options');

        if (!formSummaryExtras) {
            formSummaryExtras = document.createElement('ul');
            formSummaryExtras.classList.add('form_summary');
            formSummaryExtras.setAttribute('id', 'extras-options');
            formSummaryExtras.innerHTML = `<span class="extras-title">Extras:</span>`;
            const totalSection = document.querySelector('.form_summary-total');
            if (totalSection) {
                totalSection.insertAdjacentElement('beforebegin', formSummaryExtras);
            } else {
                document.querySelector('#extrasForm').appendChild(formSummaryExtras);
            }
        }

        const extrasOptionsInSummary =
            formSummaryExtras.getElementsByClassName('form_summary-item');

        let existingItem = null;
        Array.from(extrasOptionsInSummary).forEach((item) => {
            if (item.querySelector('.form_summary-title')?.textContent === extrasInput) {
                existingItem = item;
            }
        });

        const isChecked = document.querySelector('#' + id).checked;
        if (isChecked && !existingItem) {
            addNewExtras(extrasInput, extrasFee, formSummaryExtras);
        } else if (!isChecked && existingItem) {
            existingItem.remove();
        }

        if (extrasOptionsInSummary.length === 0) {
            formSummaryExtras.remove();
        }
    }
}

//handling insurance change
{
    const insuranceContainer = document.querySelector('.product_insurance');
    updateInsuranceInCheckout();
    updateTotal();

    insuranceContainer.addEventListener('change', function (event) {
        const input = event.target;
        if (input.matches('.insurance_plan input')) {
            updateInsuranceInCheckout(input.id);
            updateTotal();
        }
    });

    function updateInsuranceInCheckout() {
        const formInsuranceTitle = document.querySelector('#insurance-plan .form_summary-title');
        const formInsurancePrice = document.querySelector('#insurance-plan #insurance-price');

        formInsuranceTitle.textContent = document.querySelector(
            '#product_insurance .insurance_plan:has(input[type="radio"]:checked) .insurance_plan-title',
        ).textContent;
        const initialPriceText = document.querySelector(
            '#product_insurance .insurance_plan:has(input[type="radio"]:checked) .insurance_plan-price',
        ).textContent;
        formInsurancePrice.textContent = initialPriceText.replace(/[^\d,]/g, '').replace(',', '.')
            ? initialPriceText.replace(/[^\d,]/g, '').replace(',', '.') + ' EUR'
            : initialPriceText;
    }
}

function updateTotal() {
    const basicPrice = document
        .querySelector('#basic-price')
        .textContent.replace(/[^\d,]/g, '')
        .replace(',', '.');
    const insurancePrice =
        document
            .querySelector('#insurance-price')
            .textContent.replace(/[^\d,]/g, '')
            .replace(',', '.') || 0;
    const total = document.querySelector('#total-price');
    const extrasPrices = Array.from(document.querySelectorAll('.extras-price'))
        .map((price) => parseFloat(price.textContent.replace(/[^\d,]/g, '').replace(',', '.')))
        .reduce((acc, num) => acc + num, 0);
    totalAmount = (parseFloat(basicPrice) + parseFloat(insurancePrice) + extrasPrices).toFixed(2);
    total.textContent = totalAmount + ' EUR';
}

//handling submit progress
{
    const productInfo = document.querySelector('.product_info');
    const proceedButton = document.getElementById('order_presubmit_btn');
    const submitBtns = document.querySelectorAll('.order_submit-text');
    const progressSteps = document.querySelectorAll('.order-step');
    const progressWrapper = document.querySelector('.product_order-progress');

    const matchMediaQueryTablet = window.matchMedia('(max-width: 1463px)');
    let currentStep = 0;

    const steps = [
        document.getElementById('product_description'),
        document.getElementById('product_extras'),
        document.getElementById('product_insurance'),
        document.getElementById('form_order'),
    ];

    showActiveStep();

    window.addEventListener('resize', showActiveStep);
    proceedButton.addEventListener('click', changeActiveStep);

    function showActiveStep() {
        if (matchMediaQueryTablet.matches) {
            if (currentStep < 3) proceedButton.style.display = 'inline';
            if (currentStep > 0 && proceedButton.textContent !== 'Continue')
                proceedButton.textContent = 'Continue';

            if (currentStep === 0) {
                progressWrapper.style.display = 'none';
            } else {
                progressWrapper.style.display = 'flex';
            }
            steps.forEach((step, index) => {
                step.classList.toggle('hidden', index !== currentStep);
                step.classList.toggle('visible', index === currentStep);
                index !== currentStep ? disableTabbing(step) : enableTabbing(step);
            });
            submitBtns[0].textContent = `Pay Later ${totalAmount} EUR `;
            submitBtns[1].textContent = `Pay Now ${totalAmount} EUR`;
        } else {
            proceedButton.style.display = 'none';
            progressWrapper.style.display = 'none';
            submitBtns[0].textContent = 'Pay Cash';
            submitBtns[1].textContent = 'Pay Card';
        }
    }

    function changeActiveStep() {
        if (matchMediaQueryTablet.matches) {
            if (currentStep < steps.length - 1) {
                if (currentStep === 0) {
                    progressWrapper.style.display = 'none';
                }
                steps[currentStep].classList.remove('visible');
                steps[currentStep].classList.add('fading-out');

                setTimeout(() => {
                    steps[currentStep].classList.add('hidden');
                    steps[currentStep].classList.remove('fading-out');

                    currentStep++;
                    if (currentStep > 0 && proceedButton.textContent !== 'Continue')
                        proceedButton.textContent = 'Continue';
                    if (currentStep > 0) {
                        progressWrapper.style.display = 'flex';
                    }

                    steps[currentStep].classList.remove('hidden');
                    steps[currentStep].classList.add('visible');

                    disableTabbing(steps[currentStep - 1]);
                    enableTabbing(steps[currentStep]);

                    steps[currentStep]
                        .querySelectorAll(
                            'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
                        )[0]
                        .focus();

                    progressSteps[currentStep - 1].classList.add('order-step__active');
                    if (currentStep - 2 >= 0) {
                        progressSteps[currentStep - 2].classList.toggle('order-step__active');
                        progressSteps[currentStep - 2].classList.add('order-step__done');
                    }

                    if (currentStep === steps.length - 1) {
                        proceedButton.style.display = 'none';
                        productInfo.classList.add('fading-out');
                        productInfo.classList.add('hidden');
                        productInfo.classList.remove('fading-out');
                    }
                }, 400);
                submitBtns[0].textContent = `Pay Later ${totalAmount} EUR `;
                submitBtns[1].textContent = `Pay Now ${totalAmount} EUR`;
            }
        }
    }

    function disableTabbing(container) {
        const focusable = container.querySelectorAll(
            'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
        );

        focusable.forEach((el) => {
            el.dataset.prevTabindex = el.getAttribute('tabindex') ?? '';
            el.setAttribute('tabindex', '-1');
        });
    }

    function enableTabbing(container) {
        const focusable = container.querySelectorAll('[tabindex="-1"]');

        focusable.forEach((el) => {
            const prev = el.dataset.prevTabindex;
            if (prev !== undefined) {
                if (prev === '') el.removeAttribute('tabindex');
                else el.setAttribute('tabindex', prev);
            }
            delete el.dataset.prevTabindex;
        });
    }
}

//phone input
{
    const countryCodeData = {
        US: { code: '+1', length: 10, minLength: 17, placeholder: '+1 (555) 000-0000' },
        UK: { code: '+44', length: 10, minLength: 16, placeholder: '+44 1234 567 890' },
        DE: { code: '+49', length: 11, minLength: 18, placeholder: '+49 123 456 789 01' },
        UA: { code: '+38', length: 10, minLength: 18, placeholder: '+38 (123) 456-7890' },
    };
    const countrySelect = document.getElementById('country-code-select');
    const phoneInput = document.getElementById('phone');

    Object.entries(countryCodeData).forEach((country) => {
        const option = document.createElement('option');
        option.value = country[0];
        option.textContent = country[0];
        countrySelect.appendChild(option);
    });

    countrySelect.addEventListener('change', () => {
        const selectedCountry = countrySelect.value;
        const countryInfo = countryCodeData[selectedCountry];
        phoneInput.placeholder = countryInfo.placeholder;
        phoneInput.dataset.length = countryInfo.length;

        let value = phoneInput.value;
        if (value) {
            const previousCountryCode = value.split(' ')[0];
            if (previousCountryCode !== countryCodeData[selectedCountry].code) {
                value = value.replace(previousCountryCode, countryCodeData[selectedCountry].code);
            }
            phoneInput.value = formatPhoneNumber(value, selectedCountry);
        }
        validatePhoneNumber();
    });

    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/[^0-9+]/g, '');

        const selectedCountry = countrySelect.value;
        const countryCode = countryCodeData[selectedCountry].code;
        if (!value.startsWith(countryCode)) {
            value = countryCode + ' ' + value.replace(countryCode, '');
        }

        e.target.value = formatPhoneNumber(value, selectedCountry);
        validatePhoneNumber();
    });

    function formatPhoneNumber(value, country) {
        const countryInfo = countryCodeData[country];
        let digits = value.replace(/[^0-9]/g, '');
        const codeLength = countryInfo.code.replace('+', '').length;
        digits = digits.substring(codeLength);

        if (country === 'US' || country === 'UA') {
            if (digits.length > 0) {
                let formatted = countryInfo.code + ' ';
                if (digits.length <= 3) {
                    formatted += `(${digits})`;
                } else if (digits.length <= 6) {
                    formatted += `(${digits.substring(0, 3)}) ${digits.substring(3)}`;
                } else {
                    formatted += `(${digits.substring(0, 3)}) ${digits.substring(
                        3,
                        6,
                    )}-${digits.substring(6, 10)}`;
                }
                return formatted;
            }
        } else if (country === 'UK') {
            if (digits.length > 0) {
                let formatted = countryInfo.code + ' ';
                if (digits.length <= 4) {
                    formatted += digits;
                } else if (digits.length <= 7) {
                    formatted += `${digits.substring(0, 4)} ${digits.substring(4)}`;
                } else {
                    formatted += `${digits.substring(0, 4)} ${digits.substring(
                        4,
                        7,
                    )} ${digits.substring(7, 10)}`;
                }
                return formatted;
            }
        } else if (country === 'DE') {
            if (digits.length > 0) {
                let formatted = countryInfo.code + ' ';
                if (digits.length <= 3) {
                    formatted += digits;
                } else if (digits.length <= 6) {
                    formatted += `${digits.substring(0, 3)} ${digits.substring(3)}`;
                } else if (digits.length <= 9) {
                    formatted += `${digits.substring(0, 3)} ${digits.substring(
                        3,
                        6,
                    )} ${digits.substring(6)}`;
                } else {
                    formatted += `${digits.substring(0, 3)} ${digits.substring(
                        3,
                        6,
                    )} ${digits.substring(6, 9)} ${digits.substring(9, 11)}`;
                }
                return formatted;
            }
        }
        return countryInfo.code + ' ';
    }

    function validatePhoneNumber() {
        const selectedCountry = countrySelect.value;
        const countryInfo = countryCodeData[selectedCountry];
        const digits = phoneInput.value
            .replace(/[^0-9]/g, '')
            .substring(countryInfo.code.replace('+', '').length);
        const expectedLength = +phoneInput.dataset.length;

        if (digits.length !== expectedLength) {
            phoneInput.setCustomValidity(
                `Phone number must be ${expectedLength} digits long for ${selectedCountry}.`,
            );
        } else if (!/^\d+$/.test(digits)) {
            phoneInput.setCustomValidity('Phone number must contain only digits.');
        } else {
            phoneInput.setCustomValidity('');
        }
    }

    countrySelect.dispatchEvent(new Event('change'));
}

//handle submit
const form = document.querySelector('.product');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const extras = formData.getAll('extras-options');
    const extrasString = extras.join(',');
    const newObj = Object.fromEntries(formData);
    newObj['extras-options'] = extrasString || '';
    alert(JSON.stringify(newObj, null, 2));
    window.location.reload();
}
