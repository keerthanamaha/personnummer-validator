document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('personnummer');
    const validateBtn = document.getElementById('validateBtn');
    const result = document.getElementById('result');
    const details = document.getElementById('details');
    const birthDateEl = document.getElementById('birthDate');
    const ageEl = document.getElementById('age');
    const genderEl = document.getElementById('gender');

    validateBtn.addEventListener('click', parsePersonnummer);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            parsePersonnummer();
        }
    });

    // Format input as user types
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/[^\d]/g, '');
        
        if (value.length >= 8) {
            if (value.length <= 10) {
                value = value.slice(0, 6) + '-' + value.slice(6);
            } else {
                value = value.slice(0, 8) + '-' + value.slice(8);
            }
        }
        
        e.target.value = value;
    });

    function parsePersonnummer() {
        const rawInput = input.value.trim();
        clearResults();

        try {
            const parsed = parseAndValidate(rawInput);
            if (parsed) {
                showSuccess('Valid personal number');
                displayDetails(parsed);
            }
        } catch (error) {
            showError(error.message);
        }
    }

    function parseAndValidate(raw) {
        const cleaned = raw.replace(/[^\d]/g, '');
        
        if (cleaned.length !== 10 && cleaned.length !== 12) {
            throw new Error('Please enter a valid 10 or 12 digit personal number');
        }

        let year, month, day, birthNumber, checkDigit;

        if (cleaned.length === 12) {
            year = cleaned.substring(0, 4);
            month = cleaned.substring(4, 6);
            day = cleaned.substring(6, 8);
            birthNumber = cleaned.substring(8, 11);
            checkDigit = parseInt(cleaned.substring(11));
        } else {
            const currentYear = new Date().getFullYear();
            const currentCentury = Math.floor(currentYear / 100) * 100;
            const twoDigitYear = parseInt(cleaned.substring(0, 2));
            
            let fullYear;
            if (raw.includes('+')) {
                fullYear = currentCentury - 100 + twoDigitYear; 
            } else {
                const twoDigitCurrentYear = currentYear % 100;
                fullYear = (twoDigitYear > twoDigitCurrentYear + 2) 
                    ? currentCentury - 100 + twoDigitYear 
                    : currentCentury + twoDigitYear;
            }
            
            year = fullYear.toString();
            month = cleaned.substring(2, 4);
            day = cleaned.substring(4, 6);
            birthNumber = cleaned.substring(6, 9);
            checkDigit = parseInt(cleaned.substring(9));
        }

        // Validate date
        if (!isValidDate(parseInt(year), parseInt(month), parseInt(day))) {
            throw new Error('Invalid date in personal number');
        }

        // Validate checksum
        const checkString = (year.substring(2) + month + day + birthNumber).split('').map(Number);
        if (!validateChecksum(checkString, checkDigit)) {
            throw new Error('Invalid personal number (checksum failed)');
        }

        return {
            birthDate: new Date(parseInt(year), parseInt(month) - 1, parseInt(day)),
            gender: parseInt(birthNumber.charAt(2)) % 2 === 0 ? 'Female' : 'Male'
        };
    }

    function isValidDate(year, month, day) {
        const date = new Date(year, month - 1, day);
        return (
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day
        );
    }

    function validateChecksum(digits, checkDigit) {
        let sum = 0;
        digits.forEach((digit, index) => {
            let value = digit * (index % 2 === 0 ? 2 : 1);
            if (value > 9) value -= 9;
            sum += value;
        });
        
        return (10 - (sum % 10)) % 10 === checkDigit;
    }

    function displayDetails(parsed) {
        details.classList.remove('hidden');
        
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        birthDateEl.textContent = parsed.birthDate.toLocaleDateString('sv-SE', dateOptions);
        
        const today = new Date();
        let age = today.getFullYear() - parsed.birthDate.getFullYear();
        const monthDiff = today.getMonth() - parsed.birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < parsed.birthDate.getDate())) {
            age--;
        }
        ageEl.textContent = `${age} years`;
        genderEl.textContent = parsed.gender;
    }

    function showError(message) {
        result.textContent = message;
        result.className = 'result error';
        details.classList.add('hidden');
    }

    function showSuccess(message) {
        result.textContent = message;
        result.className = 'result success';
    }

    function clearResults() {
        result.textContent = '';
        result.className = 'result';
        details.classList.add('hidden');
    }
});