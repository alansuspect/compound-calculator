document.getElementById('calculateBtn').addEventListener('click', function() {
    const initialDeposit = parseFloat(document.getElementById('initialDeposit').value);
    const contributions = parseFloat(document.getElementById('contributions').value);
    const years = parseInt(document.getElementById('years').value);
    const annualReturn = parseFloat(document.getElementById('annualReturn').value) / 100;

    const frequency = document.querySelector('input[name="frequency"]:checked').value;
    let contributionFrequency;

    switch (frequency) {
        case 'annual':
            contributionFrequency = 1;
            break;
        case 'monthly':
            contributionFrequency = 12;
            break;
        case 'weekly':
            contributionFrequency = 52;
            break;
        case 'daily':
            contributionFrequency = 365;
            break;
    }

    const totalPeriods = years * contributionFrequency;
    const futureBalance = calculateFutureValue(initialDeposit, contributions, annualReturn, contributionFrequency, totalPeriods);
    document.getElementById('futureBalance').innerText = futureBalance.toFixed(2);

    drawChart(initialDeposit, contributions, annualReturn, contributionFrequency, years);
});

function calculateFutureValue(initialDeposit, contributions, annualReturn, contributionFrequency, totalPeriods) {
    let futureValue = initialDeposit;

    for (let i = 0; i < totalPeriods; i++) {
        futureValue *= (1 + annualReturn / contributionFrequency);
        futureValue += contributions;
    }

    return futureValue;
}

function drawChart(initialDeposit, contributions, annualReturn, contributionFrequency, years) {
    const labels = Array.from({ length: years + 1 }, (_, i) => i);
    const investmentData = [];
    const returnData = [];

    let futureValue = initialDeposit;

    for (let year = 0; year <= years; year++) {
        investmentData.push(initialDeposit + contributions * contributionFrequency * year);
        for (let i = 0; i < contributionFrequency; i++) {
            futureValue *= (1 + annualReturn / contributionFrequency);
            futureValue += contributions;
        }
        returnData.push(futureValue);
    }

    const ctx = document.getElementById('investmentChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Investment',
                    data: investmentData,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                },
                {
                    label: 'Return',
                    data: returnData,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Amount ($)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Years'
                    }
                }
            }
        }
    });
}
