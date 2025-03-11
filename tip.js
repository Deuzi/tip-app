document.addEventListener('DOMContentLoaded', () => {
  const percentageBtn = document.querySelectorAll('.percentage-btn');
  const billInput = document.getElementById('bill');
  const numberOfTippers = document.getElementById('tippers');
  const customPercentage = document.getElementById('custom');
  const errorMsg = document.getElementById('error');
  const tipIndividually = document.querySelector('.individual-tip');
  const billIndividually = document.querySelector('.personal-payment');
  const resetBtn = document.getElementById('reset');

  let selectedPercentage = null;

  document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
  });

  percentageBtn.forEach((btn) => {
    btn.addEventListener('click', function () {
      selectedPercentage = parseFloat(this.getAttribute('data-value'));
      customPercentage.value = '';
      highlightSelectedBtn(this);
      calculateTip();
    });
  });

  customPercentage.addEventListener('input', () => {
    selectedPercentage = parseFloat(customPercentage.value);

    calculateTip();
  });

  //handle input changes

  billInput.addEventListener('input', calculateTip);
  numberOfTippers.addEventListener('input', calculateTip);

  resetBtn.addEventListener('click', reset);

  function highlightSelectedBtn(selectedBtn) {
    document.querySelectorAll('.percentage-btn').forEach((btn) => {
      btn.style.backgroundColor = '';
      btn.style.color = '';

      selectedBtn.style.backgroundColor = 'var(--Strong-cyan)';
      selectedBtn.style.color = 'var(--Very-dark-cyan)';
    });
  }

  function calculateTip() {
    let billAmount = parseFloat(billInput.value);
    let numOfPeople = parseFloat(numberOfTippers.value);

    if (isNaN(numOfPeople) || numOfPeople <= 0) {
      errorMsg.style.display = 'block';
      numberOfTippers.style.outline = '2px solid #ff0d0d';
      return;
    } else {
      errorMsg.style.display = 'none';
      numberOfTippers.style.outline = '2px solid var(--Light-grayish-cyan)';
    }

    let percentageValue = (billAmount * (selectedPercentage || 0)) / 100;

    if (isNaN(billAmount) || isNaN(selectedPercentage)) return;
    //divide the tip perecntage to each person present
    tipIndividually.textContent = `$${(percentageValue / numOfPeople).toFixed(
      2
    )}`;

    //divide bill into the amount of persons present
    billIndividually.textContent = `$${(billAmount / numOfPeople).toFixed(2)}`;
  }

  function reset() {
    billInput.value = '';
    numberOfTippers.value = '';
    billIndividually.textContent = '$0.00';
    tipIndividually.textContent = '$0.00';
    selectedPercentage = null;
    customPercentage.value = '';
    document.querySelectorAll('.percentage-btn').forEach((btn) => {
      btn.style.backgroundColor = '';
      btn.style.color = '';
    });
  }
});
