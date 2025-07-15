# Swedish Personal Identity Number Validator

A simple web app to validate and decode Swedish Personal Identity Numbers (personnummer). 

## About

The Swedish Personal Identity Number (personnummer) is more than just an ID — it contains embedded information such as birthdate, gender, and a built-in checksum to verify validity.

This app:
- Validates the format of the personnummer.
- Checks the Luhn checksum digit.
- Extracts details like birthdate, gender, and century.
- Explains hidden patterns in the personnummer system.

## Features

- Input validation with user-friendly error messages.
- Birthdate extraction and century handling.
- Gender identification based on the second last digit.
- Checksum verification using the Luhn algorithm.
- Responsive and clean UI.

## 🛠️ How to Use
1. Open `index.html` in a browser.
2. Enter a **Swedish personal number** in the input field.
3. Click the "Validate" button or press `Enter`.
4. The script checks the input and displays:
   - ✅ **"Valid personal number"** (if the input is correct).
   - ❌ **Error messages** (if the input is invalid).
   - 📅 **Birth date**.
   - 🎂 **Age**.
   - 🚻 **Gender** (Male/Female).

## 📝 Input Format
- **Valid formats:**
  - `YYYYMMDD-XXXX` (12-digit)
  - `YYMMDD-XXXX` (10-digit, assumes correct century)

- **Examples:**
  - ✅ `20000101-1234`
  - ✅ `990312-5678`
  - ❌ `990231-6789` (Invalid date)
  - ❌ `20231501-1234` (Invalid month)

## 🧪 Sample Test Cases & Expected Output

| **Input**           | **Expected Output**                           |
|---------------------|---------------------------------------------|
| `19991231-1234`    | ✅ Valid personal number <br> 📅 Birth Date: December 31, 1999 <br> 🎂 Age: XX years <br> 🚻 Gender: Male |
| `20000815-5678`    | ✅ Valid personal number <br> 📅 Birth Date: August 15, 2000 <br> 🎂 Age: XX years <br> 🚻 Gender: Female |
| `980229-1234`      | ❌ Invalid personal number (Leap year issue if 1998) |
| `230101-4567`      | ❌ Invalid date (Future year not supported) |
| `991313-7890`      | ❌ Invalid date (Month 13 does not exist) |
| `850215-4321`      | ✅ Valid personal number <br> 📅 Birth Date: February 15, 1985 <br> 🎂 Age: XX years <br> 🚻 Gender: Female |

## 🔧 Troubleshooting
| **Issue**                   | **Possible Cause**                          | **Solution** |
|-----------------------------|--------------------------------------------|-------------|
| `Invalid personal number`   | Incorrect format or checksum failed        | Check input and re-enter |
| `Invalid date`              | Entered a non-existing date (e.g., `990231-5678`) | Ensure day, month, and year are correct |
| `Input field does not format correctly` | JavaScript is not running properly | Check browser console (F12 → Console tab) for errors |
| `Nothing happens when clicking Validate` | Missing event listeners or script | Ensure `script.js` is linked in `index.html` |

## 🔍 How It Works
1. **Cleans input**: Removes non-numeric characters except `-`.
2. **Parses the date**: Extracts `year`, `month`, and `day`.
3. **Validates the date**: Checks for real dates, including leap years.
4. **Determines century**:
   - `12-digit`: Uses full year (e.g., `20000101-1234` → `2000`).
   - `10-digit`: Assumes **current century**.
5. **Validates checksum**: Uses **Luhn algorithm**.
6. **Displays results**: If valid, shows **birth date, age, and gender**.

## 📌 Notes
- **Swedish personnummer** uses the **Luhn algorithm** for checksum validation.
- The century is **auto-detected** based on rules used in Sweden.
- The script assumes **input is Swedish-style**, so no spaces or country codes should be included.

## ⚖️ License
This project is open-source. You are free to modify and use it as needed.

---

Enjoy using the **Swedish Personal Number Validator**! 🎉
