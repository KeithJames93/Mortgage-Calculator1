document.getElementById('mortgageForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const annualInterestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTermYears = parseInt(document.getElementById('loanTerm').value);

    // Validation
    if (loanAmount <= 0 || annualInterestRate < 0 || loanTermYears <= 0) {
        alert("Please enter valid positive numbers.");
        return;
    }

    const monthlyInterestRate = (annualInterestRate / 100) / 12;
    const numberOfPayments = loanTermYears * 12;

    let monthlyPayment;

    // Handle 0% interest edge case
    if (monthlyInterestRate === 0) {
        monthlyPayment = loanAmount / numberOfPayments;
    } else {
        monthlyPayment = loanAmount *
            (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    }

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    // USD Formatter
    const usdFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    document.getElementById('monthlyPayment').textContent =
        usdFormatter.format(monthlyPayment);

    document.getElementById('totalPayment').textContent =
        usdFormatter.format(totalPayment);

    document.getElementById('totalInterest').textContent =
        usdFormatter.format(totalInterest);
});
